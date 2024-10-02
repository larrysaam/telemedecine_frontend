import { useRef, useState } from "react"
import TimePicker from "react-time-picker"
import momo from '../assets/images/momo.jpg'
import axios from "axios"
import { toast } from "react-toastify"
import emailjs from '@emailjs/browser';



export const PrePayment = ({setPaypage})=>{

    const form = useRef();

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [phone, setPhone] = useState('')
    const [speciality, setSpeciality] = useState('')

    const url = 'https://telemedecine-backend-ohl8.onrender.com/'


    const Pay=()=>{
        axios.post(`${url}consult`,
        {
            userId: localStorage.getItem('userid'),
            userName: localStorage.getItem('myname'),
            doctorId: localStorage.getItem('doctorid'),
            doctorName: localStorage.getItem('doctorName'),
            status: 'waiting',
            scheduledDate: date,
            schedule: {
                day: date,
                timeslot: time
            }
        })
        .then(res=>{
            console.log("post consult__", res)
            setPaypage(false)
            toast.success('Payment Successfull')
        })
        .catch(err =>{
            console.log("post consult error__", err)
        })


        //create chat between doctor and patient
        axios.post(`${url}chat`,
        {
            userId: localStorage.getItem('userid'), 
            doctorId: localStorage.getItem('doctorid')
        })
        .then(res=>{
            console.log("post consult__", res)
            setPaypage(false)
            toast.success('Payment Successfull')
        })
        .catch(err =>{
            console.log("post consult error__", err)
        })


        sendEmail()
        
    }



    //send email to doctor
    const sendEmail = () => {
        emailjs
        .send('service_m48epj9', 'template_zfuvc68', {user_name: 'MedTek', user_email: localStorage.getItem('doctoremail'), message: 'new consultation on your MedTek account'}, {
            publicKey: 'TvwrOi9bnjL3NCTgh',
        })
        .then(
            () => {
            toast.success("Email Sent")
            },
            (error) => {
                console.log(error)
                toast.success("Email not sent")
            },
        );
    };
   

    return(
        <div className="w-full h-full bg-bggray flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">

            <div className="w-1/2 h-4/5 bg-white rounded-xl flex flex-col justify-center items-center gap-3">
                <p className="text-4xl font-semibold font-sans">Fee: 1,500 FCFA</p>
                <p>{speciality}</p>
                
                <div className=" h-40 flex flex-col justify-center items-center gap-3">
                    <p className="mr-2 font-sans font-semibold text-xl">Consultation Date and Time</p>
                    <input 
                        className="w-60 h-10 rounded-lg bg-bggray pl-5 outline-none "
                        type="date"
                        value={date}
                        onChange={(e)=>setDate(e.target.value)}
                    />

                    <TimePicker onChange={setTime} value={time} />
                </div>
               
                
                <p className="mr-2 font-sans font-semibold text-xl">Payment Method</p>
                <div className="flex justify-center items-center">
                    <img 
                        src={momo} 
                        alt="mtn mobile money"
                        className="h-9 w-24 mr-2 object-cover rounded-lg"
                    />
                    <input 
                        className="w-60 h-10 rounded-lg bg-bggray pl-5 outline-none "
                        type="number"
                        value={phone}
                        placeholder="MTN number"
                        onChange={(e)=>setPhone(e.target.value)}
                    />
                </div>
                {/* <a href="https://pay.mesomb.com/l/Ow6yh4MB8joXNFHqBgMf">pAy</a> */}
                <button 
                    onClick={()=>Pay()}
                    className="h-12 w-32 text-xl rounded-lg bg-golden font-sans font-semibold hover:scale-105 duration-500"
                >
                    Pay
                </button>


            </div>

        </div>
    )
}