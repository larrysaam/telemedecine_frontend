import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import docimg from '../../assets/images/doc.jpeg'
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";


export const ChatListItem =({Id, doctorId, userId, Name, Location, MeetingStatus, timeleft})=>{

    const url = 'https://telemedecine-backend-ohl8.onrender.com/'
    const nav = useNavigate()
    const [status, setStatus] = useState(MeetingStatus)

    useEffect(()=>{

    })

    //move to chat page
    const handleChatClick =()=>{
        nav('/chat', {state: {doctorId, Name, userId}})
    }

    //close meeting and change status to done
    const CloseMeating =()=>{
        axios.patch(`${url}consult/status/${Id}`)
        .then(res=>{
            console.log(res)
            toast.success('status changed successfuly')
            setStatus('done')
        })
        .catch(err=>{
            console.log(err)
            toast.error("can not change status")
        })
    }



    return(
        <div 
            className={
                status === "done"? 
                "w-3/4 h-24 flex justify-start align-middle text-center p-3 pl-7 rounded-2xl border-2 border-lightestgray shadow-xl mt-2 mb-2  opacity-40 duration-500 bg-white"
                :
                "w-3/4 h-24 flex justify-start align-middle text-center p-3 pl-7 rounded-2xl border-2 border-lightestgray shadow-xl mt-2 mb-2 hover:shadow-brightgreen hover:shadow-lg hover:ml-3 duration-500 bg-white"
            }>

            {/* profile image of patient */}
            <div className="w-20 h-20 align-middle flex-col flex justify-center">
                <img src= {docimg} className="h-12 w-12 m-auto object-cover rounded-full  text-brightgreen"/>
            </div>

            {/* patients Name and Location */}
            <div className=" w-1/3 ml-3 flex flex-col justify-start align-bottom  m-auto">
                <h3 className="text-lg text-black font-bold text-left">{Name}</h3>
                <h4 className="text-sm text-lightgray text-center">{Location}</h4>
            </div>

            {/* scheduled consultation status */}
            <div className="w-96 flex justify-end align-middle m-auto ">
                <div className="h-full flex-col justify-center items-center gap-2">
                    <p className={ 
                        status === 'done'? 
                        'hidden' 
                        :
                        "text-base text-center align-middle text-black p-1 pl-3 pr-3 font-semibold rounded-2xl bg-bggray "
                    }>{status}</p>
                    <p className="text-xs mt-3">{timeleft}</p>
                </div>
                <button 
                    onClick={()=>CloseMeating()}
                    className="h-8 ml-3 bg-red text-white rounded-full p-1 pl-3 pr-3"
                >Done</button>
                
                {
                    status === 'done'?
                        ""
                        :
                        <IoChatbubbleEllipsesSharp
                            onClick={()=>handleChatClick()} 
                            className="text-lightestgray w-7 h-7 ml-4 cursor-pointer "
                        />
                }
            </div>
        </div>
    )
}