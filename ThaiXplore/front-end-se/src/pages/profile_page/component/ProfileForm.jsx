import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { EditingField } from "./editingField";
import axios from "axios";

const ProfileForm = () => {
    const userData = useSelector((state) => state.auth.user);
    const [data, setData] = useState(userData || {});
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState("");


    const fetchData = async () => {
        try {
          setLoading(true);
          const resAuth = await axios.post(`http://localhost:3000/auth/login`,{
            email : "hatsawat.i@ku.th",
            password : "root2"
          },{ withCredentials: true });
          const res = await axios.get(`http://localhost:3000/users`,{ withCredentials: true });
    
          setData(res.data);
        } catch(error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
          

    console.log("ProfileForm userData:", data);
    // console.log(userData);

    useEffect(() => {
        fetchData();
      },[]);

    // useEffect(() => {
    //     if (userData) {
    //         setData(userData);
    //     }
    // }, [userData]);

    // if (!userData){
    //     return <p>Loading user data...</p>
    // }

    return(
        <div className="flex flex-1 w-full h-full flex-col bg-gray-50">
            <h1 className="text-2xl font-bold mx-5 my-5">Profile</h1>
            <div className="flex flex-1 mx-5 justify-center items-start">
                <div className="grid grid-cols-1 gap-4">
                    <EditingField label="Name" value={data.firstName+" "+data.lastName} hasProfileImage={true} actionLabel="Edit"/>
                    <EditingField label="Email" value={data.email}/>
                    <EditingField label="Phone" value={data.phoneNumber}/>
                    <EditingField label="Password" value={"231456897"} actionLabel="Edit"/>
                </div>
            </div>
        </div>

                        
        
    );
} 

export default ProfileForm;

{/*
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
    */}
