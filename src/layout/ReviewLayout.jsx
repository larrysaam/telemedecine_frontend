import { useState, useEffect } from "react"
import { ReviewCard } from "../components/ReviewCard/ReviewCard"
import useFetchConsults from "../hooks/useFetchConsults"
import axios from "axios"

export const ReviewLayout = ()=>{

    const url = "https://telemedecine-backend-ohl8.onrender.com/user/"
    const [data, setData] = useState([])



    //get all reviews from a doctor
    useEffect(()=>{
        axios.get(`${url}${localStorage.getItem('username')}`)
        .then(res=>{
            console.log('review__',res.data.data[0])
            setData(res.data.data[0].review)
        })
        .catch(err=>{
            console.log(err)
        })

    },[])

    return(
        <div className="h-full w-1/2 flex flex-col justify-start items-start pt-4">
            <p className="text-2xl font-semibold font-sans text-black mb-4">Reviews</p>
            <div className="h-full w-full flex flex-col justify-start items-start pt-6 overflow-y-scroll">

                {
                    data.length <= 0?
                    <p className="text-2xl font-sans text-lightgray font-semibold mt-10">No Review</p>
                    :
                    data.map((review, i)=>{
                        return(
                            <ReviewCard useName={review.username} comment={review.comment} key={i}/>
                        )
                    })
                }
                {/* <ReviewCard useName={"Larrien"} comment={'Ive been using this telemedicine app for a long time, and Im really impressed with how easy it is to schedule appointments and consult with doctors. The video quality is excellent, and the doctors are always professional and helpful. Highly recommend!'}/>
                <ReviewCard useName={"Larrien"} comment={'Ive been using this telemedicine app for a long time, and Im really impressed with how easy it is to schedule appointments and consult with doctors. The video quality is excellent, and the doctors are always professional and helpful. Highly recommend!'}/>
                <ReviewCard useName={"Larrien"} comment={'Ive been using this telemedicine app for a long time, and Im really impressed with how easy it is to schedule appointments and consult with doctors. The video quality is excellent, and the doctors are always professional and helpful. Highly recommend!'}/>
                <ReviewCard useName={"Larrien"} comment={'Ive been using this telemedicine app for a long time, and Im really impressed with how easy it is to schedule appointments and consult with doctors. The video quality is excellent, and the doctors are always professional and helpful. Highly recommend!'}/> */}
            </div>
            
        </div>
    )
}