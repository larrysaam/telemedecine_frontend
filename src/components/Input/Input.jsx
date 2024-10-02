

export const MessageInput =({placeholder, setText, text})=>{
    return(
        <input 
            placeholder={placeholder} 
            onChange={(e)=>setText(e.target.value)} 
            value={text}
            className="w-full p-1 pl-5 text-lg text-black placeholder-lightgray bg-lightestgray outline-none rounded-full"
        />
    )
}

export const UserInput =({setText, text, placeholder})=>{
    return(
        <input 
            value={text} 
            onChange={(e)=>setText(e.target.value)} 
            type="number"
            maxLength={9}
            placeholder={placeholder}
            className="w-11/12 h-10 outline-none rounded-full text-lightgray text-base border-none bg-bggray shadow-xl p-2 pl-5 m-auto hover:w-full duration-150"
        />
    )
}
