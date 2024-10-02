import { SearchBar } from "../components/Search/SearchBar"


export const SearchTopBar =({value, setValue, setOption})=>{

    return(
        <div className="w-1/2 flex flex-col justify-center items-start">
           <SearchBar value={value} setValue={setValue}/>

            {/* specialities list */}
            <div className="w-40 mt-4">
                <label id="spec"></label>
                <select for='spec' onChange={(e)=>setOption(e.target.value)} name="specialization" className="w-36 h-10 rounded-xl border-2 border-lightgray">
                    <option value='Orthopedic'>Specialities</option>
                    <option value='Orthopedic'>Orthopedic</option>
                </select>
            </div>
        
        </div>
    )
}