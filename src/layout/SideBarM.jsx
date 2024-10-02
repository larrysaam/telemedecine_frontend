import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const Sidebar =()=>{

    const nav = useNavigate()
    const [active, setActive] = useState(1)

    // handle side nav bar clicks
    const onClickBtn =(opt)=>{
        setActive(opt)
        if(opt===1){
            nav('/')
        }else if(opt === 4){
            (localStorage.getItem('title') === 'patient'? 
                nav('/search')
                :
                nav('/Consultations')
            )
        }else if(opt === 5){
            (localStorage.getItem('title') === 'patient'? 
                nav('/Consultations')
                :
                nav('/schedule')
                
            )
            
        }else if(opt === 6){
            nav('/notifications')
        }
    }

    return(
        <div className="flex flex-col border-r-2 border-brightgreen pr-2 pt-24 relative">
            <div className="h-6 w-full">
                <p className=" absolute top-7 text-3xl font-sans font-bold">Med
                    <span className="text-3xl font-sans font-bold text-brightgreen">Tek</span>
                </p>
            </div>
            <ul className="h-full list-none relative">
                <li> 
                    <button
                        onClick={()=>onClickBtn(1)} 
                        className={ active === 1 ? "h-11 w-40 mb-2 mt-2 bg-brightgreen rounded-lg border-l-4 p-2 pr-10 border-l-green flex justify-start align-middle text-white font-semibold  text-base"
                        : "h-11 w-40 mb-2 mt-2 bg-none border-none flex justify-start align-middle text-lightgray text-base hover:border-l-green hover:bg-brightgreen rounded-lg hover:text-white hover:pr-10 hover:p-2"}>
                        Dashboard </button> </li>

                <li> 
                    <button
                        onClick={()=>onClickBtn(4)} 
                        className={ active === 4 ? "h-11 w-40 mb-2 mt-2 bg-brightgreen rounded-lg border-l-4 p-2 pr-10 border-l-green flex justify-start align-middle text-white font-semibold  text-base"
                        : "h-11 w-40 mb-2 mt-2 bg-none border-none flex justify-start align-middle text-lightgray text-base hover:border-l-green hover:bg-brightgreen rounded-lg hover:text-white hover:pr-10 hover:p-2"}>
                            {localStorage.getItem('title') === 'patient'? 'Specialists' : 'Consultations'}
                        </button> </li>
                <li> 
                    <button
                        onClick={()=>onClickBtn(5)} 
                        className={ active === 5 ? "h-11 w-40 mb-2 mt-2 bg-brightgreen rounded-lg border-l-4 p-2 pr-10 border-l-green flex justify-start align-middle text-white font-semibold  text-base"
                        : "h-11 w-40 mb-2 mt-2 bg-none border-none flex justify-start align-middle text-lightgray text-base hover:border-l-green hover:bg-brightgreen rounded-lg hover:text-white hover:pr-10 hover:p-2"}>
                        {localStorage.getItem('title') === 'patient'? 'Consultations' : 'Schedule'} </button> </li>
                <li> 
                    <button
                        onClick={()=>onClickBtn(6)} 
                        className={ active === 6 ? "h-11 w-40 mb-2 mt-2 bg-brightgreen rounded-lg border-l-4 p-2 pr-10 border-l-green flex justify-start align-middle text-white font-semibold  text-base"
                        : "h-11 w-40 mb-2 mt-2 bg-none border-none flex justify-start align-middle text-lightgray text-base hover:border-l-green hover:bg-brightgreen rounded-lg hover:text-white hover:pr-10 hover:p-2"}>
                        Notifications</button></li>
                <li> 
                    <button
                        onClick={()=>onClickBtn(7)} 
                        className={ active === 7 ? "h-11 w-40 mb-2 mt-2 bg-brightgreen rounded-lg border-l-4 p-2 pr-10 border-l-green flex justify-start align-middle text-white font-semibold  text-base"
                        : "h-11 w-40 mb-2 mt-2 bg-none border-none flex justify-start align-middle text-lightgray text-base hover:border-l-green hover:bg-brightgreen rounded-lg hover:text-white hover:pr-10 hover:p-2"}>
                        Settings </button> </li>
                <li> 
                    <button
                        onClick={()=>onClickBtn(2)} 
                        className={ active === 2 ? "h-11 w-40 mb-2 mt-2 bg-brightgreen rounded-lg border-l-4 p-2 pr-10 border-l-green flex justify-start align-middle text-white font-semibold  text-base"
                        : "h-11 w-40 mb-2 mt-2 bg-none border-none flex justify-start align-middle text-lightgray text-base hover:border-l-green hover:bg-brightgreen rounded-lg hover:text-white hover:pr-10 hover:p-2"}>
                        Languages</button> </li>
                <li> 
                    <button
                        onClick={()=>nav('/logout')} 
                        className={ active === 3 ? "absolute bottom-10 h-11 w-40 mb-2 mt-2 bg-brightgreen rounded-lg border-l-4 p-2 pr-10 border-l-green flex justify-start align-middle text-white font-semibold  text-base"
                        : "absolute bottom-10 h-11 w-40 mb-2 mt-2 bg-none border-none flex justify-start align-middle text-lightgray text-base hover:border-l-green hover:bg-brightgreen rounded-lg hover:text-white hover:pr-10 hover:p-2"}>
                        Logout</button> </li>
            </ul>
        </div>
    )
}