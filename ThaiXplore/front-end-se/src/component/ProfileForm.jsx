import { useState, useEffect } from "react";

const ProfileForm = () => {
    const [data, setData] = useState(true);
    const [isEditing, setIsEditing] = useState(false); // จะไว้ใช้สลับระหว่างโชว์ข้อมูลกับตอน Edit Profile

    useEffect(() => {
        const fetchData = async () =>{
        const jsonData = {
                "email" : "hatsawat.i@ku.th",
                "password" : "root1",
                "firstName" : "Hatsawat",
                "lastName" : "Intrasod",
                "address" : "Buriram",
                "phoneNumber" : "0123456789",
                "role" : "tourist"
            };
            setData(jsonData);
        }; fetchData();
    }, []);



    return(
        <div className="w-3/4 m-10 p-10 bg-white">
            <form className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                    <label className="text-2xl font-medium">First Name</label>
                    <p className="p-2 text-xl border rounded-md bg-gray-100">{data.firstName}</p>
                </div>
                <div>
                    <label className="text-2xl font-medium">Last Name</label>
                    <p className="p-2 text-xl border rounded-md bg-gray-100">{data.lastName}</p>
                </div>
                <div>
                    <label className="text-2xl font-medium">Email</label>
                    <p className="p-2 text-xl border rounded-md bg-gray-100">{data.email}</p>
                </div>
                <div>
                    <label className="text-2xl font-medium">Phone Number</label>
                    <p className="p-2 text-xl border rounded-md bg-gray-100">{data.phoneNumber}</p>
                </div>
                <div>
                    <label className="text-2xl font-medium">Password</label>
                    <p className="p-2 text-xl border rounded-md bg-gray-100">{data.password}</p>
                </div>
                <div className="">
                </div>
                <div className="">
                    <label className="text-2xl font-medium">Address</label>
                    <p className="p-2 text-xl border rounded-md bg-gray-100">{data.address}</p>
                </div>

            </form>

        </div>
    );
} 

export default ProfileForm;

/*<form className="grid grid-cols-2 gap-5 space-x-5">
                <div>
                    <label className="text-2xl font-medium">First Name</label>
                    <input type="text" className="p-2 text-xl border rounded-md" />
                </div>
                <div>
                    <label className="text-2xl font-medium">Last Name</label>
                    <input type="text" className="p-2 text-xl border rounded-md" />
                </div>
                <div>
                    <label className="text-2xl font-medium">Email</label>
                    <input type="text" className="p-2 text-xl border rounded-md" />
                </div>
                <div>
                    <label className="text-2xl font-medium">Phone Number</label>
                    <input type="text" className="p-2 text-xl border rounded-md" />
                </div>

            </form>*/