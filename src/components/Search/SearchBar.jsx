
import { FaSearch } from "react-icons/fa";

export const SearchBar = ({value, setValue})=>{

    return(

        <div className="w-4/5 flex justify-start items-center">
            <input 
                type="text"
                value={value}
                onChange={(e)=>setValue(e.target.value)}
                placeholder="Search a speciality"
                className="w-96 h-10 rounded-full bg-bggray p-2 pl-6 outline-none hover:border-2 hover:border-brightgreen duration-400"
            />

            <FaSearch className="w-7 h-7 ml-3 text-brightgreen"/>
        </div>
    )
}