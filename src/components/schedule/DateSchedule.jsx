import { useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { Switch } from '@mui/material';

export const DateShedule = ({day, start, setStart, end, setEnd, checked, setChecked})=>{

    return(
        <div 
            className={
                (checked)?
                "w-full h-40 pl-4 mb-2 font-semibold bg-bggray rounded-xl flex justify-start items-start p-3":
                "w-full h-40 opacity-40 pl-4 mb-2 font-semibold bg-bggray rounded-xl flex justify-start items-start p-3"
            }>
            <div className='flex flex-col justify-start items-start'>
                <div className='w-full flex justify-between items-center'>
                    <p className="text-left">{day}</p>
                    <Switch
                        checked={checked}
                        onChange={()=>{
                            checked? setChecked(false) : setChecked(true)
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                        />
                </div>
                <div className='flex justify-center items-center gap-4'>
                    <TimePicker onChange={setStart} value={start} />
                    <TimePicker onChange={setEnd} value={end} />
                </div>
            </div>
           
        </div>
    )
}