import { ChatTopProfile } from "../components/Profile/ChatProfile"

export const TopBar =({imagesrc, userName, status})=>{

    return(
        <div className="w-full h-16 align-middle pt-2">
            {/* logo */}
            <img src={''} alt="logo" className="w-52 h-8 ml-11 object-fill float-left"/>

            {/* profile */}
            <div className="max-w-60 flex justify-center align-middle float-right mr-7">
                <ChatTopProfile imagesrc={imagesrc} userName={userName} status={status}/>
            </div>
        </div>
    )
}