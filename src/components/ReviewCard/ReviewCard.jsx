

export const ReviewCard =({useName, comment})=>{

    return(
        <div className="w-96  flex flex-col justify-start items-start p-3 pl-6 bg-bggray rounded-xl mb-2">
            <p className="text-base font-bold font-sans">{useName}</p>
            <p className="text-lightgray text-sm text-left">{comment}</p>
        </div>
    )
}