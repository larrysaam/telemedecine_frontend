import { useState } from "react";
import { FaStethoscope } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";


export const SearchCard = ({doctorId, username, email, location, reviewsnum, speciality, setPaypage, consultations })=>{


    return(
        <div className="w-3/5 h-20 p-3 mb-4 pl-5 relative bg-bggray rounded-xl flex justify-start items-center hover:shadow-lg hover:shadow-brightgreen hover:ml-2 duration-500">
            <CgProfile 
                className="h-14 w-14 rounded-full border-2 border-brightgreen text-brightgreen"
            />

            <div className="h-24 w-40 flex flex-col justify-center items-start ml-5">
                <label className="font-sans font-bold text-lg text-left">{username}</label>
                <p className=" rounded-xl text-black bg-lightestgray text-sm pl-3 pr-3">{speciality}</p>
            </div>

            <div className="h-24 w-40 absolute right-28 flex flex-col justify-center items-start ml-10">
                <ul className="list-none text-xs">
                    <li>Location: {location}</li>
                    <li>Review: {reviewsnum}</li>
                </ul>
            </div>
            <button 
                onClick={
                    ()=>{
                        setPaypage(true)
                        localStorage.setItem('doctorid', doctorId )
                        localStorage.setItem('doctorName', username)
                        localStorage.setItem('doctoremail', email)
                    }
                }
                className="absolute right-5 text-base bg-brightgreen font-semibold font-sans flex justify-center items-center gap-2 p-2 rounded-full"
            >
                Consult Now!
                <FaStethoscope/>
            </button>
        </div>
    )
}