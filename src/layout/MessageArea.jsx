import { useEffect } from "react"
import { SendingMessageCard, ReceivingMessageCard } from "../components/MessageCard/messageCard"

export const MessageArea =({scrollableDivRef, messages, myid})=>{

    useEffect(()=>{
        console.log('messages _ ', messages)
        console.log('myid _ ', myid)
    },[messages])


    return (
        <div  ref={scrollableDivRef} className="w-full h-full pb-32 flex-col justify-start align-top bg-bggray overflow-y-scroll">

            {
                
                (messages.chat) ?
                messages.chat.map((msg, i)=>{
                    if(msg.receiver === myid){
                        return(<ReceivingMessageCard text={msg.content} key={i}/>)
                    }else{
                        return(<SendingMessageCard text={msg.content} key={i}/>)
                    }
                })
                :
                ''
            }
            

        </div>
    )
}