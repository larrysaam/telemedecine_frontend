import { TopChatBar } from "../../layout/TopChatBar"
import { BottomChatBar } from "../../layout/BottomChatBar"
import { ChatSideProfile } from "../../components/Profile/ChatProfile"
import { MessageArea } from "../../layout/MessageArea"
import { useEffect, useState } from "react"
import Profile from '../../assets/images/Christ.png'
import { useLocation } from "react-router-dom"
import useFetchConsults from "../../hooks/useFetchConsults"
import { io } from 'socket.io-client'
import sendDM from "../../utils/sendDM"
import axios from "axios"
import docimg from '../../assets/images/doc.jpeg'



export const Chat =()=>{

    const [user, setUser] = useState('')  
    const [text, setText] = useState('')
    const [myid, setMyid] = useState('')
    const [chatProfile, setChatProfile] = useState([])
    const [response, setResponse] = useState([])
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState([])
    const [input, setInput] = useState('')
    const [socket, setSocket] = useState(null)

    const url = 'https://telemedecine-backend-ohl8.onrender.com/chat/'
    const url2 = 'https://telemedecine-backend-ohl8.onrender.com/user/v2/'
    const locate = useLocation()

    // const {response, loading, error} = useFetchConsults(`${url}${locate.state.doctorId}"_"${locate.state.userId}`)


    //fetch messages between 2 users
    useEffect(()=>{
        axios.get(`${url}${locate.state.doctorId}_${locate.state.userId}`)
        .then(res=>{
            console.log("chats _ ", res.data.data[0])
            setMessages(res.data.data[0])
        })
        .catch(err=>{
            console.log(err)
        })
    },[])


    //fetch chat's profile info
    useEffect(()=>{
        if(user === 'doctor'){
            axios.get(`${url2}${locate.state.doctorId}`)
            .then(res=>{
                console.log("profile _ ", res.data.data[0])
                setChatProfile(res.data.data[0])
            })
            .catch(err=>{
                console.log("profile err__ ",err)
            })
        }else{
            axios.get(`${url2}${locate.state.userId}`)
            .then(res=>{
                console.log("profile _ ", res.data.data[0])
                setChatProfile(res.data.data[0])
            })
            .catch(err=>{
                console.log("profile err__ ",err)
            })
        }

            
    },[])
    

    useEffect(()=>{
        setUser(localStorage.getItem('title'))
        setMyid(localStorage.getItem('userid'))
        console.log("locate _ ",locate.state)
    },[])


    // establish connection
    useEffect(()=>{
        const newsocket = io(`https://telemedecine-backend-ohl8.onrender.com/`)
        setSocket(newsocket)

        return ()=>{
            newsocket.disconnect()
        }
    },[])


    //set user as online
    useEffect(()=>{
        if(socket === null) return
        socket.emit("addNewUser", myid)

        return () => {
            socket.off("addNewUser")
        }
    },[socket])




    // send message
    useEffect(()=>{
        if(socket === null) return

        (user === 'doctor')?
            socket.emit("sendMessage", {content: newMessage, sender: locate.state.doctorId, receiver: locate.state.userId})
            :
            socket.emit("sendMessage", {content: newMessage, sender: locate.state.userId, receiver: locate.state.doctorId})

    },[newMessage])



    //recieve message
    useEffect(()=>{
        if(socket === null) return
        
        socket.on("getMessage", res =>{
            console.log("received message : ",res)

            if(myid !== res.receiver) return

            setMessages((prev) => [...prev, res])
            console.log(messages)

        })


        return ()=>{
            socket.off("getMessage")
        }
    },[socket])




    //send messages
    const sendMessage =async()=>{
        console.log("message id  ",messages._id)
        var res = []

        {
            user === 'doctor'?
                res = await sendDM(`${url}${messages._id}`, locate.state.doctorId, locate.state.userId, input, 'text', new Date().toISOString())
            :
                res = await sendDM(`${url}${messages._id}`, locate.state.userId, locate.state.doctorId, input, 'text', new Date().toISOString())
        }
       

        if(res.status === 200){
            setNewMessage(input)
            setMessages(()=>[...messages, {content: input, sender: myid} ])
        }
    }





    return(
        <div className="w-full h-full flex justify-center align-middle">
            {
                user === 'patient'?
                    <ChatSideProfile  
                        imagesrc={docimg} 
                        userName={locate.state.Name} 
                        description={''} 
                        rating={'4'}
                    />
                    :
                    ''
            }
            
            <div className={ user === 'patient'? 
                            "max-h-full w-3/4 flex-col justify-start align-middle overflow-hidden relative": 
                            "max-h-full w-full flex-col justify-start align-middle overflow-hidden relative"}>

                {/* top hear bar */}

                {
                    user === 'patient'?
                        <TopChatBar 
                            imagesrc={docimg} 
                            userName={locate.state.Name}   
                            status={"online"}
                        />
                        :
                        <TopChatBar 
                            imagesrc={docimg} 
                            userName={locate.state.Name}   
                            status={"online"}
                        />
                }
                

                {/* message area */}
                <MessageArea messages={messages} myid={myid}/>

                {/* bottom input message bar */}
                <BottomChatBar 
                    setText={setInput}  
                    text={input} 
                    sendMsg={sendMessage}
                />
            </div>
        </div>
    )
}