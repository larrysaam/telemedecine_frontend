

export const ReceivingMessageCard=({text})=>{
    return(
        <div className="w-full min-h-10 ">
            <div className="max-w-52 min-w-12 min-h-10 mt-3 mb-2 ml-5 bg-green rounded-br-full rounded-bl-full rounded-tr-full p-3 pl-5">
                <p className="text-sm text-white">{text}</p>
            </div>
        </div>
       
    )
}


export const SendingMessageCard=({text})=>{
    return(
        <div className="w-full min-h-10 flex justify-end align-middle ">
            <div className="max-w-52 min-w-12 min-h-10 mt-3 mb-2 mr-5  bg-white rounded-br-full rounded-bl-full rounded-tl-full p-3 pl-5">
                <p className="text-sm text-black">{text}</p>
            </div>
        </div>
       
    )
}

