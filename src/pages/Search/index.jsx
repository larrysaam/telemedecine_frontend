import { useEffect, useState } from "react"
import { SearchCard } from "../../components/Search/SearchCard"
import { SearchTopBar } from "../../layout/SearchTopBar"
import useFetchConsults from "../../hooks/useFetchConsults"
import axios from "axios"
import { PrePayment } from "../../layout/ConsultBox"

export const Search = ()=>{

    const [searchValue, setSearchValue] = useState('')
    const [option, setOption] = useState('')
    const [data, setData]= useState([])
    const [filteredData, setFilteredData]= useState([])

    const [paypage, setPaypage] = useState(false)


    const url = 'https://telemedecine-backend-ohl8.onrender.com/speciality/all'
    // const url2 = 'https://telemedecine-backend-ohl8.onrender.com/user/all'
    const url2 = 'https://telemedecine-backend-ohl8.onrender.com/user/doctors/all'



    //load list of all doctors on page render
    useEffect(()=>{
        axios.get(`${url2}`)
        .then(res=>{
            console.log('search_____',res)
            var data = res.data.data
            setFilteredData(data)
            setData(data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])


    //filter list of doctors and returns list corresponding to the searched speciality
    useEffect(()=>{
        if(searchValue !== ''){
            var filtered = data.filter(doctor => {
                if(doctor.speciality.toLowerCase().startsWith(searchValue.toLowerCase())){
                    return doctor
                }
            })
            setData(filtered)
        }else{
            setData(filteredData)
        }
       

    },[searchValue])


    return(
        <div className="h-full w-full pt-9 overflow-hidden flex flex-col justify-start align-middle  pl-7">
            <p className="text-3xl font-sans font-semibold">Specialist</p>
            <div className="w-full mb-10 pt-8">
                <SearchTopBar value={searchValue} setValue={setSearchValue} setOption={setOption}/>
            </div>

            {/* list of search results */}
            <div className="h-full overflow-y-scroll">
                {
                    data.length <= 0?
                    <p className="text-2xl font-sans font-semibold mt-10 text-lightgray">No Specialist Available</p>
                    :
                    data.map((doctor, i)=>{
                        return(
                            <SearchCard 
                                doctorId={doctor._id}
                                username={`Dr. ${doctor.username}`} 
                                location={doctor.location} 
                                email = {doctor.email}
                                reviewsnum={doctor.review.length}
                                speciality={doctor.speciality}
                                setPaypage = {setPaypage}
                                key={i}
                            />
                        )
                    })
                }

            </div>


            {/* payment page */}
            {
                paypage?
                    <PrePayment setPaypage={setPaypage}/>
                    :
                    ''
            }
        </div>
    )
}