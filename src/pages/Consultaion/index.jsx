import { useEffect, useState } from "react"
import { ChatListItem } from "../../components/List/List"
import axios from 'axios'
import useFetchConsults from "../../hooks/useFetchConsults"
import { useNavigate } from "react-router-dom"


export const Consultations = ()=>{

    const [data, setData] = useState([])
    const nav = useNavigate()
    const title = localStorage.getItem("title")
    const url = "https://telemedecine-backend-ohl8.onrender.com/consult/doctor/"
    const url2 = "https://telemedecine-backend-ohl8.onrender.com/consult/user/"


    //fetch user consultations scheduled for a Doctor
    const {response, loading, error} = useFetchConsults(`${url}${localStorage.getItem('userid')}`)
    const {response2, loading2, error2} = useFetchConsults(`${url2}${localStorage.getItem('userid')}`)




    //render page which matches the user title (doctor or normal user) 
    //when the response data is avialable
     //set Doctor profile info
     useEffect(()=>{
        if(title === 'doctor'){
            axios.get(`${url}${localStorage.getItem('userid')}`)
            .then(res=>{
                console.log('consult____',res.data.data)
                var data = res.data.data
                setData(data)
            })
            .catch(err=>{
                console.log(err)
            })
        }else if(title === 'patient'){
            axios.get(`${url2}${localStorage.getItem('userid')}`)
            .then(res=>{
                console.log('consult____',res.data.data)
                var data = res.data.data
                setData(data)
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            nav('/')
        }
        

    },[])




    return(
        <div className="w-full h-full flex flex-col justify-start align-middle pl-4 border-t-2 border-bggray pt-3">
            <p className="text-3xl font-semibold font-sans text-left mt-10">Consultations</p>

        
                <div className="w-full h-full flex-col justify-center align-middle overflow-y-scroll mt-5 ">

                    {
                        data.length <= 0 ?
                        <p className="text-2xl font-sans font-semibold mt-10 text-lightgray">No Consultation Available</p>
                        :
                        data.map((chats, i)=>{
                            return (
                                (title === 'doctor')?
                                    <ChatListItem 
                                        doctorId={chats.doctorId}
                                        userId={chats.userId}
                                        Name={chats.userName}
                                        Location={chats.location}
                                        MeetingStatus={chats.status}
                                        timeleft={chats.schedule[0].timeslot}
                                        key={i}
                                    />
                                    :
                                    <ChatListItem 
                                        doctorId={chats.doctorId}
                                        userId={chats.userId}
                                        Name={`Dr. ${chats.doctorName}`}
                                        Location={chats.location}
                                        MeetingStatus={chats.status}
                                        timeleft={chats.schedule[0].timeslot}
                                        key={i}
                                    />
                                
                            )
                        })
                    }
                
                    {/* <ChatListItem doctorId={'12'} userId={'12'} Name={'Mr. Paul August'} Location={"yaounde, Cameroon"} MeetingStatus={'Waiting'} timeleft={"12h : 00min left"}/>
                    <ChatListItem doctorId={'12'} userId={'12'} Name={'Mr. Paul August'} Location={"yaounde, Cameroon"} MeetingStatus={'Waiting'} timeleft={"12h : 00min left"}/>
                    <ChatListItem doctorId={'12'} userId={'12'} Name={'Mr. Paul August'} Location={"yaounde, Cameroon"} MeetingStatus={'Done'} timeleft={"-- --"}/> */}
                </div>
    

            
        </div>
    )
}