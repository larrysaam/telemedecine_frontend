import { useEffect, useState } from "react"
import { Card } from "../../components/DashboardCard/card"
import axios from "axios"
import { ListStats } from "../../layout/ListStats"


export const Dashboard =()=>{

    const url = 'https://telemedecine-backend-ohl8.onrender.com/consult/'
    const url2 = 'https://telemedecine-backend-ohl8.onrender.com/user/'
    const column = ["Patient Name", "Date", "Location", "Price"]
    const [consult, setConsult] = useState([])
    const [reviewCount, setReviewCount] = useState(0)


    //get total consultations on page render
    useEffect(()=>{
        if(localStorage.getItem('title') === 'doctor'){
            axios.get(`${url}doctor/${localStorage.getItem('userid')}`)
            .then(res => {
                console.log("consultations __ ", res.data )
                setConsult(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }else{
            axios.get(`${url}user/${localStorage.getItem('userid')}`)
            .then(res => {
                console.log("consultations __ ", res.data.data )
                setConsult(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
       
    },[])


    //get total reviews for a specific doctor on page render
    useEffect(()=>{
        axios.get(`${url2}${localStorage.getItem('username')}`)
        .then(res => {
            console.log('review ', res.data.data[0].review.length)
            setReviewCount(res.data.data[0].review.length)
        })
        .catch(err => {
            console.log(err)
        })
    },[])


    // const col =[
    //     {
    //         name: 'Patient Name',
    //         title: 'username'
    //     },
    //     {
    //         name:
    //         title:
    //     },
    //     {
    //         name:
    //         title:
    //     },
    //     {
    //         name:
    //         title:
    //     },
    // ]



    return(
        <div className="h-full w-full flex-col justify-center items-center align-middle pt-20 overflow-y-scroll">
            <div className="mb-10 w-full flex justify-evenly align-middle">
                <Card  heading={'CONSULTATION'} counttype={"Total Consultation"} count={consult.length}/>
                <Card  heading={'ASSISTANCE'} counttype={"Total Assistance"} count={consult.length}/>
                <Card  heading={'RATING'} counttype={"Total Rating"} count={reviewCount}/>
            </div>

            <div className="w-5/6 h-1/2 bg-white rounded-xl shadow-2xl m-auto flex justify-end items-center">
                <ListStats title={'consultations'} column={column} data={consult}/>
            </div>
        </div>
    )
}