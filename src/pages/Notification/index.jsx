import { useEffect, useState } from "react"
import { NotificationBox } from "../../components/Notification/NotificationBox"
import { json } from "react-router-dom"


export const Notif = ()=>{

    const [notif, setNotif] = useState([])
    const [delet, setDelet] = useState('')


    useEffect(()=>{
        localStorage.setItem('notif', 
        JSON.stringify([
            {id: 1, msg: "New message from Mr. Paul"},
            {id: 2, msg: "Mr. John Paid for a consultation"}
        ]))

    },[])

    useEffect(()=>{
        setNotif(JSON.parse(localStorage.getItem('notif')))
    },[])


    useEffect(()=>{
        if(delet !== ''){
            var filtered = notif.filter(not => not.id !== delet)
            localStorage.setItem('notif', filtered)
            setNotif(filtered)
        }
    },[delet])


    return(
        <div className="h-full w-full pt-9 overflow-hidden flex-col justify-start align-middle  pl-7">
            <h3 className="text-2xl font-sans font-semibold">Notification</h3>

            <div className="w-4/5 h-full mt-10 flex-col justify-start gap-1 overflow-y-scroll">
                
                { 
                    notif.length <=0?
                    <p className="text-3xl font-sans font-semibold">Empty</p>
                    :
                    notif.map((notif, i )=>{
                        return(
                            <NotificationBox msg={notif.msg} setDelet={setDelet} id={notif.id} key={i}/>
                        )
                    }) 
                }

            </div>
        </div>
    )
}