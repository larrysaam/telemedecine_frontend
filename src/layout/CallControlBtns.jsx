import { EndCall, MuteMic, VideoOff } from "../components/Button/Buttons"

export const CallControlBtn =({VideoClick, mute, MuteClick, Endcall})=>{

    return(
        <div className="w-80 h-16 absolute bottom-6 left-0 right-0 m-auto rounded-lg bg-white shadow-lg shadow-brightgreen flex justify-center align-middle gap-5">
            <VideoOff handleClick={VideoClick}/>
            <MuteMic mute={mute} handleClick={MuteClick}/>
            <EndCall handleClick={Endcall}/>
        </div>
    )
}