import { MessageInput } from "../components/Input/Input"
import { LinkBtn, SendMsgBtn } from "../components/Button/Buttons"

export const BottomChatBar=({setText, text, sendMsg})=>{

    
    return(
        <div className="w-full h-14 p-1 flex justify-center align-middle bg-bggray absolute bottom-0 left-0 right-0">
            
            <div className="w-3/4 flex justify-center align-middle ml-12">
                <LinkBtn/>
                <MessageInput 
                    placeholder='Type your message and send'
                    setText={setText} 
                    text={text}
                />
            </div>
            <SendMsgBtn sendMsg={sendMsg}/>
        </div>
    )
}