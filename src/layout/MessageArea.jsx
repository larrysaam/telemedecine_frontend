import { useEffect } from "react"
import { SendingMessageCard, ReceivingMessageCard } from "../components/MessageCard/messageCard"

export const MessageArea =({messages, myid})=>{

    useEffect(()=>{
        console.log('messages _ ', messages)
        console.log('myid _ ', myid)
    },[messages])


    return (
        <div className="w-full h-full flex-col justify-start align-top bg-lightgray overflow-y-scroll">

            {/* {
                (messages) ?
                messages.chat.map((msg, i)=>{
                    if(msg.receiver === myid){
                        <ReceivingMessageCard text={msg.content} key={i}/>
                    }else{
                        <SendingMessageCard text={msg.content} key={i}/>
                    }
                })
                :
                ''
            } */}
            
           
            <SendingMessageCard text={'Hello'}/>

        </div>
    )
}