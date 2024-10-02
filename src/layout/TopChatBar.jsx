import { ChatTopProfile } from "../components/Profile/ChatProfile"
import { CallBtn, VideoBtn } from "../components/Button/Buttons"


export const TopChatBar =({imagesrc, userName, status})=>{

    const OpenCall=()=>{
        console.log("call")
    }

    const OpenVideo=()=>{
        console.log("video")
    }

    return(
        <div className="w-full h-16 pl-6 pr-6 bg-white flex justify-center align-middle">
            <div className="w-8/12 flex align-middle justify-start">
                <ChatTopProfile  imagesrc={imagesrc} userName={userName} status={status}/>
            </div>
            <div className="w-4/12 flex justify-end align-middle">
                <VideoBtn OpenVideo={OpenVideo}/>
            </div>
        </div>
    )
}