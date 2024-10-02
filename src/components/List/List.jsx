import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import docimg from '../../assets/images/doc.jpeg'


export const ChatListItem =({doctorId, userId, Name, Location, MeetingStatus, timeleft})=>{


    const nav = useNavigate()


    const handleChatClick =()=>{
        nav('/chat', {state: {doctorId, Name, userId}})
    }

    return(
        <div 
            className={
                MeetingStatus === "Done"? 
                "w-3/4 h-24 flex justify-start align-middle text-center p-3 pl-7 rounded-2xl border-2 border-lightestgray shadow-xl mt-2 mb-2 hover:shadow-red opacity-40 hover:shadow-lg hover:ml-3 duration-500 bg-white"
                :
                "w-3/4 h-24 flex justify-start align-middle text-center p-3 pl-7 rounded-2xl border-2 border-lightestgray shadow-xl mt-2 mb-2 hover:shadow-brightgreen hover:shadow-lg hover:ml-3 duration-500 bg-white"
            }>

            {/* profile image of patient */}
            <div className="w-20 h-20 align-middle ">
                <img src= {docimg} className="h-16 w-16 object-cover rounded-full  text-brightgreen"/>
            </div>

            {/* patients Name and Location */}
            <div className=" w-32 ml-3 flex flex-col justify-start align-bottom  m-auto">
                <h3 className="text-lg text-black font-bold text-center">{Name}</h3>
                <h4 className="text-sm text-lightgray text-center">{Location}</h4>
            </div>

            {/* scheduled consultation status */}
            <div className="w-96 flex justify-end align-middle m-auto ">
                <div className="h-full flex-col justify-center items-center gap-2">
                    <p className={ 
                        MeetingStatus === 'Done'? 
                        'text-base text-center align-middle text-white p-1 pl-3 pr-3 font-semibold rounded-2xl bg-lightblue' 
                        :
                        "text-base text-center align-middle text-black p-1 pl-3 pr-3 font-semibold rounded-2xl bg-brightgreen "
                    }>{MeetingStatus}</p>
                    <p className="text-xs mt-3">{timeleft}</p>
                </div>
                
                {
                    MeetingStatus === 'Done'?
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