import { FaStar } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import docimg from '../../assets/images/doc.jpeg'



export const ChatTopProfile=({imagesrc, userName, status})=>{
    return(
        <div className="w-56 h-28 flex align-middle justify-center" >
            <div className="">
                <img 
                    src={imagesrc} 
                    alt='profile image of telemedicine app cameroon' 
                    className="h-10 w-10 rounded-full"
                />
            </div>
            <div className="flex-col justify-start align-middle ml-3">
                <h3 className="text-lg text-lightgray">{userName}</h3>
                <p className=" text-sm text-green">{status}</p>
            </div>
        </div>
    )
}

export const ChatSideProfile=({imagesrc, userName, description, rating })=>{
    return(
        <div className="w-1/4 h-full flex-col align-middle justify-center bg-white" >
            <div className="w-full">
                <img 
                    src={docimg} 
                    alt='profile image of telemedicine app cameroon' 
                    className="h-28 w-28 m-auto mb-2 block object-cover mt-20 rounded-full border-brightgreen border-2"
                />
            </div>
            <div className="flex-col justify-start align-middle ml-3">
                <div className="flex justify-center align-middle w-full">
                    <FaStar className="w-3 h-3 mr-1 text-golden"/>
                    <FaStar className="w-3 h-3 mr-1 text-golden"/>
                    <FaStar className="w-3 h-3 mr-1 text-golden"/>
                    <FaStar className="w-3 h-3 mr-1 text-golden"/>
                </div>
                
                <h3 className="text-xl text-black font-bold text-center mt-2">{userName}</h3>
                <p className=" w-3/4 m-auto text-center text-sm text-black mt-6">{description}</p>
                
                <button 
                    className="w-52 h-10 pt-2 rounded-full flex justify-center align-center font-semibold text-center bg-green text-white m-auto mt-10"
                > 
                    Go Premuim
                    <BsStars className="w-5 h-5 text-white"/>
                </button>
            </div>
        </div>
    )
}