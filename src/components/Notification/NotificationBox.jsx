
import { ImCross } from "react-icons/im";


export const NotificationBox = ({msg, id, setDelet})=>{

    return(
        <div className="w-2/3 h-11 pl-5 relative bg-bggray mb-4 rounded-3xl flex justify-start  items-center hover:shadow-brightgreen hover:shadow-md hover:ml-2 duration-300">
            <div className="bg-lightgray w-8 h-8 rounded-full mr-5">

            </div>

            <p className="text-lightgray text-base font-sans mr-10">{msg}</p>

            <p className="p-1 pl-3 pr-3 absolute right-12 font-semibold text-sm bg-brightgreen text-white rounded-full">Today</p>
            
            <ImCross 
                onClick={()=>setDelet(id)}
                className="h-3 w-3 absolute right-7 cursor-pointer"
            />
        </div>
    )
}