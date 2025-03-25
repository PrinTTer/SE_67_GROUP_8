export const PaymentUserDetail = (prop) => {
    const {user , bookingDetail} = prop;
    console.log(user);

    if(!user){
        return (
            <div className="w-full flex items-center justify-center p-8">
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full p-2">
            <UserDetail label={"First Name"} value={user?.firstName}/>
            <UserDetail label={"Last Name"} value={user?.lastName}/>
            <UserDetail label={"Email"} value={user?.email}/>
            <UserDetail label={"Phone"} value={user?.phoneNumber}/>
            <UserDetail label={"Guests"} value={bookingDetail.adult + bookingDetail.child || "1"}/>        
        </div>
    );
}

export const UserDetail = (prop) => {
    const {label, value} = prop;
    return(
        <div className="flex flex-col">
            <h3 className="text-sm font-medium text-gray-500">{label}</h3>
            <div className="mt-1">
                <p className="text-base font-medium text-gray-800">{value || "-"}</p>
            </div>
        </div>
    );
}