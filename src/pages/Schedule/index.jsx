import { useState, useEffect } from "react"
import { ReviewLayout } from "../../layout/ReviewLayout"
import { ScheduleLeftSide } from "../../layout/scheduleLayout"
import axios from "axios"

export const Schedule = ()=>{

    const url = 'https://telemedecine-backend-ohl8.onrender.com/user/'

    const [userName, setUserName] = useState('Dr. Paul')
    const [speciality, setSpeciality] = useState('Orthopedist')
    const [description, setDescription] = useState('Dr. Paul')


    //set Doctor profile info
    useEffect(()=>{
        axios.get(`${url}${localStorage.getItem('username')}`)
        .then(res=>{
            console.log('review__',res.data.data[0])
            var data = res.data.data[0]
            setUserName(data.username)
            setSpeciality(data.speciality)
            setDescription(data.description)
        })
        .catch(err=>{
            console.log(err)
        })

    },[])


    return(
        <div className="h-full w-full pt-9 overflow-hidden flex justify-start align-middle pl-7">
            <ScheduleLeftSide 
                userName={userName} 
                setUserName={setUserName}
                speciality={speciality}
                setSpeciality={setSpeciality}
                description={description}
                setDescription={setDescription}
            />
            <ReviewLayout/>
        </div>
    )
}