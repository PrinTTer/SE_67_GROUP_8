import { useState } from "react";

const ProfileForm = () => {
    const [ isEditing, setIsEditing ] = useState(false);
    const [data, setData] = useState({
        firstName: "Hatsawat",
        lastName: "Intrasod",
        email: "hatsawat.i@ku.th",
        phoneNumber: "0123456789",
        password: "root1",
        address: "Buriram",
    });

    const handleChange = (field, value) => {
        setData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const updateIsEditing = () => {
        setIsEditing(!isEditing)
    }

    return(
        <div className="flex flex-1 w-full h-full flex-col bg-amber-50">
            <h1 className="text-2xl font-bold mx-5 my-5">Profile</h1>
            <div className="flex flex-1 bg-white mx-5 my-20 gap-10 relative border-1 shadow-black shadow-md">
                <div className="absolute -top-10 left-4 w-18 h-18
                    lg:-top-18 lg:left-8 lg:w-36 lg:h-36 
                    bg-gray-200 rounded-full border-1 items-center text-center ">
                </div>
                <div>
                    <div onClick={updateIsEditing} className={`${!isEditing ? 'block' : 'hidden'}`}>
                        <button className="absolute -top-6 right-10 w-24 h-12 
                        lg:-top-8 lg:right-18 lg:w-36 lg:h-16 
                        bg-gray-200 rounded-2xl shadow-2xs hover:bg-gray-400 active:shadow-inner transition duration-400">
                            <h1 className="text-md lg:text-2xl text-black font-bold">Edit Profile</h1>
                        </button>
                    </div>
                </div>
                
                <div className="flex flex-1">
                        <div className="w-3/4 m-10 p-10 bg-white">
                            <form className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                <EditingField label="First Name" value={data.firstName} isEditing={isEditing} onChange={(value) => handleChange("firstName", value)}/>
                                <EditingField label="Last Name" value={data.lastName} isEditing={isEditing} onChange={(value) => handleChange("lastName", value)}/>
                                <EditingField label="Email" value={data.email} isEditing={isEditing} onChange={(value) => handleChange("email", value)}/>
                                <EditingField label="Phone Number" value={data.phoneNumber} isEditing={isEditing} onChange={(value) => handleChange("phoneNumber", value)}/>
                                <EditingField label="Password" value={data.password} isEditing={isEditing} onChange={(value) => handleChange("password", value)}/>
                                <div></div>
                                <EditingField label="Address" value={data.address} isEditing={isEditing} onChange={(value) => handleChange("address", value)}/>
                                
                            </form>
                        </div>
                        <div className={`${!isEditing ? 'hidden' : 'block'}`}>
                                <button onClick={updateIsEditing}
                                    className="absolute right-30 bottom-6 w-18 h-10 bg-blue-500 text-white text-xl font-medium rounded-md hover:bg-blue-600">
                                    Back
                                </button>
                                <button onClick={updateIsEditing}
                                    className="absolute right-6 bottom-6 w-18 h-10 bg-blue-500 text-white text-xl font-medium rounded-md hover:bg-blue-600">
                                    Save
                                </button>
                        </div>
                        
                </div>
            </div>
        </div>

                        
        
    );
} 

export const EditingField = (prop) => {
    const { label, value, isEditing, onChange } = prop;
    return(
        <div>
            <label className="text-2xl font-medium block">{label}</label>
            {isEditing ? (
                <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 text-xl border rounded-md" />
            ) : (
                <p className="p-2 text-xl border rounded-md bg-gray-200">{value}</p>
            )}

        </div>
    );
}

export default ProfileForm;

/*
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
*/
