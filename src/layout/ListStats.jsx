import React from "react";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";

export const ListStats =({title, data, column})=>{

    const columns = ["Id", "File Transfered", "File Received", "Date", "Time"];
    const columns2 = ['Id', 'Date', 'Time']

    const nav = useNavigate()

    return(
        <div className="w-full rounded-2xl pt-3 p-3 flex justify-centre items-center hover:shadow-xl hover:shadow-lightgray hover:scale-105 duration-500">
            {/*React MUI Tables */}
            <MUIDataTable
                title={title}
                data={data}
                columns={column}
            />
        </div>
    )
}