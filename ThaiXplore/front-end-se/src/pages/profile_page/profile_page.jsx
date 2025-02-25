import { useState, useEffect } from "react";
import { NavBarWithOutText } from "../../component/navbar";
import ProfileForm from "./component/ProfileForm";
import axios from "axios";

const ProfilePage = () => {

const [data , setData] = useState("");
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState("");
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.post(`http://localhost:3000/auth/login`,{
        email : "hatsawat.i@ku.th",
        password : "root2"
      },{ withCredentials: true },);

      setData(res.data);
    } catch(error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
        fetchData();
    },[]);

   return(
    <div className="flex flex-1 flex-col-reverse lg:flex-row">
        <NavBarWithOutText/>
            <div className="flex flex-5 items-center justify-center flex-col">
                <ProfileForm dataUser={data}/>
            </div>
    </div>
   ); 
}

export default ProfilePage;
//<ProfileForm/>