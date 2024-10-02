import { useState } from "react"
import { NextButton } from "../components/Button/Buttons"
import { UserInput } from "../components/Input/Input"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const PreProfile=()=>{

    const url = "https://telemedecine-backend-ohl8.onrender.com/user/"
    const header = {}
    const nav = useNavigate()
    const myid = localStorage.getItem('userid')
    const [user, setUser] = useState('doctor')
    const [phone, setPhone] = useState('')
    const [description, setDescription] = useState('')
    const headers = {'Content-Type': 'application/json'};


    // This script updates the user profile 
    const updateProfile = async()=>{

        await axios.patch(`${url}${myid}`,
            { title: user, location: "Yaounde", phone, speciality: "", description},
        ).then(data=>{
            console.log("profile updated ", data)
            localStorage.setItem("title",data.title)
            localStorage.setItem("user", data)
            nav('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }


    const handleClick=()=>{
        if(phone < 9){
            alert("Invalid phone number")
        }else{
            updateProfile()
        }
    }


    return(
        <div className="h-4/5 w-96 rounded-2xl bg-white shadow-2xl flex-col align-middle justify-center m-auto">
            <h4 className="mt-14 text-center text-lg text-lightgray font-sans">Please complete your profile</h4>


            {/* input fields */}
            <div className="w-full h-32 flex align-middle justify-center mt-14 m-auto p-12">
                <UserInput setText={setPhone} text={phone} placeholder={'Enter phone number'}/>
            </div>

            {/* type of user option selector */}
            <div className="w-9/12 m-auto flex justify-evenly align-middle mt-1 mb-8">
                <button 
                    onClick={()=>setUser('doctor')}
                    className={ 
                        user === 'doctor'?
                        "w-32 h-8 rounded-full bg-lightestgray font-semibold shadow-xl":
                        "w-32 h-8 rounded-full border-2 border-bggray font-semibold"
                    }>
                    Doctor
                </button>
                <button 
                    onClick={()=>setUser('patient')}
                    className={ 
                        user === 'patient'?
                        "w-32 h-8 rounded-full bg-lightestgray font-semibold shadow-xl":
                        "w-32 h-8 rounded-full border-2 border-bggray font-semibold"
                    }>
                    Patient
                </button>
            </div>
            {
                (user === 'doctor')?
                    <div className="w-full h-20 flex flex-col justify-center items-center ">
                        <textarea 
                            onChange={(e)=>setDescription(e.target.value)}
                            type="textarea"
                            cols={10}
                            className="w-3/4 h-40 p-3 text-sm outline-none rounded-2xl bg-bggray"
                        />
                    </div>
                    :
                    ''

            }
            

            

            {/* next button */}
            <div className="w-full h-32 flex align-middle justify-center m-auto">
                <NextButton handleClick={handleClick} phone={phone}/>
            </div>
        </div>
    )
}