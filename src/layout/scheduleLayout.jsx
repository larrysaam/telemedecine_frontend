import axios from "axios";
import { DateShedule } from "../components/schedule/DateSchedule"
import { CiEdit } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import { useEffect, useState } from "react";
import useFetchConsults from "../hooks/useFetchConsults"


export const ScheduleLeftSide =({userName, setUserName, speciality, setSpeciality, description, setDescription})=>{

    const [visibility, setVisibility] = useState(false)
    const url = 'https://telemedecine-backend-ohl8.onrender.com/schedule/'
    const url2 = 'https://telemedecine-backend-ohl8.onrender.com/user/'
    const id = localStorage.getItem('userid')
    const user = localStorage.getItem('user')
    const email = localStorage.getItem('username')


    // const {response, loading, error} = useFetchConsults(`${url}${id}`)




    const [schedule, setSchedule] = useState([
        {day: "Monday", start: "10:00", end:"17:00", checked: true},
        {day: "Tuesday", start: "10:00", end:"17:00", checked: true},
        {day: "Wednesday", start: "10:00", end:"17:00", checked: true},
        {day: "Thursday", start: "10:00", end:"17:00", checked: true},
        {day: "Friday", start: "10:00", end:"17:00", checked: true},
        {day: "Saturday", start: "10:00", end:"17:00", checked: true},
        {day: "Sunday", start: "10:00", end:"17:00", checked: false}
    ])

    const [data, setData] = useState([])

    

    //get doctor schedule
    useEffect(()=>{
        axios.get(`${url}${id}`)
        .then(res=>{
            console.log(res.data.data[0].availability)
            setSchedule(res.data.data[0].availability)
        })
        .catch(err=>{
            console.log("shedule error ", err)
        })
    },[])


    useEffect(()=>{
        console.log("visibility", visibility)
    },[visibility])

    //display "save changes" button when data changes
    useEffect(()=>{
        setVisibility(true)
        console.log("Changes Made")
    },[userName, speciality, description])


    //display "save changes" button when data changes
    useEffect(()=>{
        setVisibility(true)
    },[schedule])


    //subit changes
    const handleSubmit =()=>{

        //submit schedule changes
        axios.patch(
            `${url}${id}`, 
            {availability: schedule}
        )
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error updating resource:', error);
        });


        //submit user changes
        var newuser = {...user, username: userName, speciality, description}

        axios.patch(
            `${url2}${id}`, 
            {newuser}
        )
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error updating resource:', error);
        });

        setVisibility(false)
    }


    //update an object in an Array
    function handleUpdateItem(day, updatedItem) {
        const updatedItems = schedule.map(item => {
          if (item.day === day) {
            return updatedItem;
          }
          return item;
        });
      
        setSchedule(updatedItems);
    }




    return(
        <div className="w-1/2 h-full mt-6 mr-16 flex-col justify-center items-center overflow-y-scroll ">
            <img src="" alt="" className="w-32 h-32 border-2 rounded-full m-auto"/>

            <div className="flex justify-center items-center m-auto">
                <input 
                    type="text"
                    value={(userName === ''? 'Dr.' : `Dr. ${userName}`)} 
                    onChange={(e)=>setUserName(e.target.value)}
                    className="w-fit h-9 text-xl font-sans text-center rounded-full bg-none p-4 pl-4 outline-bggray"
                />

            </div>
            

            <div className="flex justify-center items-center m-auto">
                <input 
                    type="text"
                    value={(speciality === ''? 'Generalist' : `${speciality}`)} 
                    onChange={(e)=>setSpeciality(e.target.value)}
                    className="w-fit h-9 text-base text-lightgray font-sans text-center rounded-full bg-none p-4 pl-4 outline-bggray"
                />

            </div>

            <div className="flex justify-center items-center m-auto">
                <textarea 
                    type="text"
                    maxLength={90}
                    value={(description === ''? 'Empty' : `${description}`)} 
                    onChange={(e)=>setDescription(e.target.value)}
                    className="w-96 h-24 text-base text-lightgray bg-bggray font-sans text-center rounded-lg p-2 pl-4 outline-bggray"
                />
            </div>


            <div className="h-full w-4/5 m-auto flex flex-col justify-start items-start mt-7 pl-4 ">
                <div className="w-full flex justify-between items-center align-middle">
                    <label className="text-xl font-semibold  text-left font-sans mb-6">Schedule Consultation</label>
                    {
                        visibility === false? "":
                        <button 
                            onClick={handleSubmit}
                            className="h-8 w-32 pl-3 pr-3 text-black font-sans font-semibold rounded-full bg-brightgreen hover:text-white duration-500">
                            Save Changes
                        </button>
                    }
                    
                </div>
                
                
                {schedule.map((shed, i)=>{
                    return(
                        // <DateShedule day={shed.day} start={shed.start} setStart={()=>handleUpdateItem(shed.day, { ...shed,  })} end={shed.end} setEnd={} checked={} setChecked={} key={i}/>
                        <DateShedule 
                            day={shed.day} 
                            start={shed.start} 
                            setStart={(newvalue) => handleUpdateItem(shed.day, { ...shed, start: newvalue })} 
                            end={shed.end} 
                            setEnd={(newvalue) => handleUpdateItem(shed.day, { ...shed, end: newvalue })} 
                            checked={shed.checked} 
                            setChecked={(newvalue) => handleUpdateItem(shed.day, { ...shed, checked: newvalue })} 
                            key={i}
                        />  
                    )
                })}
            </div>
        </div>
    )
}