import { useEffect, useState } from "react"


const useFetchConsults = (url)=>{
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        FetchUsers()
    },[])

    const FetchUsers=async()=>{
        setLoading(true)
        try {
            const res = await fetch(url)
            const users = await res.json()
            setResponse(users)
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false)
        } 
    }

    return {response, loading, error}
}

export default useFetchConsults