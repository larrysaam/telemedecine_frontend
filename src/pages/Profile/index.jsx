import { useEffect, useState } from "react"
import { PreProfile } from "../../layout/preprofile"
import axios from "axios"


export const Profile=()=>{

    useEffect(()=>{
        
    },[])

    return(
        <div className="w-full h-full flex align-middle justify-center border-2 border-black">
            <PreProfile/>
        </div>
    )

}