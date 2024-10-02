

export const Card =({heading, counttype, count})=>{
    return(
        <div className="w-72 h-52 rounded-3xl shadow-2xl flex-col justify-center align-middle p-10 pt-5 relative">
            {/* heading */}
            <h3 className="text-2xl text-black font-bold mb-6">{heading}</h3>

            {/* counter section */}
            <div className="w-full h-auto flex justify-start align-middle">
                <div className="flex-col justify-center align-middle float-left">
                    <h3 className="text-sm text-black font-semibold">{counttype}</h3>
                    <h3 className="text-2xl text-black font-bold">{count}</h3>
                </div>
                <div className="counter ">

                </div>
            </div>

            {/* time */}
            <div className="w-3/4 h-auto flex justify-start pl-3 align-middle border-t-2 border-t-lightestgray bottom-4 left-8 right-6 absolute pt-2">
                <h3 className="text-sm text-lightestgray font-semibold">Last 24 hours</h3>
            </div>
        </div>
    )
}