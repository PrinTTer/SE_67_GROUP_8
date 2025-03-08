import { useSelector } from "react-redux";

export const PaymentUserDetail = () => {
    const { user } = useSelector((state) => state.auth);
    return(
        <div className="grid grid-cols-2 my-2 mx-4 gap-4 w-full">            
            <UserDetail label={"First Name"} data={user.firstName}/>
            <UserDetail label={"Last Name"} data={user.lastName}/>
            <UserDetail label={"Email"} data={user.email}/>
            <UserDetail label={"Phone"} data={user.phoneNumber}/>
            <UserDetail label={"Amount"} data={"Number"}/>
        </div>
        
    );
}

export const UserDetail = (prop) => {
    const {label, data} = prop;
    return(
        <div className="flex flex-col">
            <h className="font-bold">{label}</h>
            <div className="w-2/4 p-2 ml-2">
                <p className="text-2xl font-medium">{data}</p>
            </div>
        </div>
        
    );
}
