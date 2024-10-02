import { TopBar } from "../../layout/TopBarM"
import { Sidebar } from "../../layout/SideBarM"
import {Routes, Route, Outlet} from 'react-router-dom'
import { Dashboard } from "../Dashboard"
import {Chat} from "../Chat"
import { Consultations } from "../Consultaion"


export const MainBoard=()=>{

    return(
        <div className="w-full h-full flex-col justify-center align-middle">
            {/* top bar */}

            {/* main page */}
            <div className="w-full h-full flex justify-center align-middle">
                {/* nav side bar */}
                <div className="w-52 h-full flex justify-start">
                    <Sidebar/>
                </div>

                {/* navigate the pages */}
                <div className="w-4/5 h-full">
                    <Outlet/>
                </div>
                
            </div>
        </div>
    )
}