import { IoMdSend } from "react-icons/io";
import { MdInsertLink } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { IoMdVideocam } from "react-icons/io";
import { IoVideocamOff } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";
import { BsSendFill } from "react-icons/bs";


export const SendMsgBtn=({sendMsg})=>{
    return(
        <button className="bg-none w-20 border-none">
            <IoMdSend 
                className="w-8 h-8 text-brightgreen hover:w-9 hover:h-9" 
                onClick={()=>sendMsg}
            />
        </button>
    )
}

export const LinkBtn=({OpenFiles})=>{
    return(
        <button className="bg-none w-6 border-none mr-3">
            <MdInsertLink 
                className="w-7 h-7 text-black"
                onClick={()=>OpenFiles}
            />
        </button>
    )
}

export const CallBtn=({OpenCall})=>{
    return(
        <button className="bg-none w-6 mr-4 border-none cursor-pointer">
            <IoCall 
                className="w-6 h-6 text-brightgreen"
                onClick={()=>OpenCall}
            />
        </button>
    )
}

export const VideoBtn=({OpenVideo})=>{
    return(
        <button className="bg-none w-6 border-none cursor-pointer">
            <IoMdVideocam 
                className="w-6 h-6 text-brightgreen"
                onClick={()=>OpenVideo}
            />
        </button>
    )
}

//next button for prep profile info 
export const NextButton =({handleClick, phone})=>{

    return(
        <button
            onClick={handleClick}
            className={
                (phone === '' || phone.length < 9)?
                "h-9 w-44 bg-bggray text-lg text-white font-semibold text-center rounded-full m-auto cursor-default":
                "h-9 w-44 bg-brightgreen text-lg text-white font-semibold text-center rounded-full m-auto hover:w-48 hover:h-10 duration-300 cursor-pointer"
                
            }
        >
            Next
        </button>
    )
}


// switch of the video call camera
export const VideoOff = ({handleClick})=>{
    return(
        <button 
            onClick={handleClick}
            className="h-10 w-10 mt-2 p-1 rounded-full flex align-middle justify-center bg-brightgreen border-none"
        >
            <IoVideocamOff className="h-6 w-6 m-auto text-white"/>
        </button>
    )
}


// mute video call btn
export const MuteMic = ({mute, handleClick})=>{
    return(
        <button 
            onClick={handleClick}
            className="h-10 w-10 mt-2 p-1 rounded-full flex align-middle justify-center bg-brightgreen border-none"
        >
            {mute? 
                <FaMicrophoneSlash className="h-6 w-6 m-auto text-bggray"/>:
                <FaMicrophone className="h-6 w-6 m-auto text-white"/>
            }
            
        </button>
    )
}


// end video call btn
export const EndCall = ({handleClick})=>{
    return(
        <button 
            onClick={handleClick}
            className="h-10 w-10 mt-2 p-1 rounded-full flex align-middle justify-center bg-red border-none"
        >
            <MdCallEnd className="h-6 w-6 m-auto text-white"/>
        </button>
    )
}



// save feedbacks
export const SaveFeedBackBtn = ({handleClick})=>{
    return(
        <button 
            onClick={handleClick}
            className="h-10 w-10 mt-2 ml-4 p-1 rounded-full flex align-middle justify-center bg-brightgreen border-none"
        >
            <BsSendFill className="h-5 w-5 m-auto text-white"/>
        </button>
    )
}

