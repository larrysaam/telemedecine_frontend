import { useEffect, useState } from "react"
import { PreProfile } from "../../layout/preprofile"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export const Profile=()=>{

    const nav = useNavigate()
    const title = localStorage.getItem('title')

    //If title of user is defined, skip to home page
    useEffect(()=>{
        
        if(title === null || title === ''){
            console.log("title -> ", title)
        }else{
            console.log("title -> ", title)
            nav('/home')
        }
    },[])

    return(
        <div className="w-full h-full flex align-middle justify-center border-2 border-black">
            <PreProfile/>
        </div>
    )

}