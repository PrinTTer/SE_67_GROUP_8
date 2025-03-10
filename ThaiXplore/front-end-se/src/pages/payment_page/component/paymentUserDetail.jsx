
export const PaymentUserDetail = (prop) => {
    const {user} = prop
    console.log(user);

    if(!user){
        return <p>loading user data ...</p>;
    }

    return(
        <div className="grid grid-cols-2 my-2 mx-4 gap-4 w-full">
            <UserDetail label={"First Name"} value={user?.firstName}/>
            <UserDetail label={"Last Name"} value={user?.lastName}/>
            <UserDetail label={"Email"} value={user?.email}/>
            <UserDetail label={"Phone"} value={user?.phoneNumber}/>
            <UserDetail label={"Amount"} value={"Number"}/>        
        </div>
    );
}

export const UserDetail = (prop) => {
    const {label, value} = prop;
    return(
        <div className="flex flex-col">
            <h1 className="font-bold">{label}</h1>
            <div className="w-2/4 p-2 ml-2">
                <p className="text-2xl font-medium">{value}</p>
            </div>
        </div>
        
    );
}
