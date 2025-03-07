import { faCalendarCheck, faCircleCheck } from "@fortawesome/free-regular-svg-icons"
import { faHotel,faUtensils, faCar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

const BusinessForm = () => {
    const [formData, setFormData] = useState({
        businessName: "",
        mainBusiness: "",
        juristicId: "",
        email: "",
        phone: "",
        province: "",
        district: "",
        subDistrict: "",
        postalCode: "",
        certificate: "",
        businessImage: "",
    });
    const handleBusinessChange = (selected) => {
        setFormData((prev) => ({ ...prev, mainBusiness: selected }));
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = () => {
        console.log("Form Data:", formData);
    };
    

    
    return(
        <div className="flex flex-1 w-full h-full bg-gray-200 items-center justify-center">
            <div className="flex flex-1 flex-col p-10 m-10 bg-white border-1 shadow-black shadow-md">
                <div>
                    <label className="block text-xl font-bold">Business</label>
                    <input 
                    type="text"
                    className="p-2 mt-2 text-xl border rounded-md"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            />
                </div>
                <div className="flex flex-col mt-2">
                    <label className="text-xl font-bold">Main Business</label>
                    <BusinessSelector selectedBusiness={formData.mainBusiness} onChange={handleBusinessChange} />
                </div>
                <label className="text-xl font-bold">Detail</label>
                <form className="grid grid-cols-4 mt-2 mx-8 gap-4">
                    <div className="col-span-2">
                        <TextFieldBusiness title={"Juristic ID 13 digits"} name="juristicId" value={formData.juristicId}  onChange={handleChange}/>
                    </div>
                    <div className="col-span-2">
                        <TextFieldBusiness title={"Email Contact"} name="email" value={formData.email}  onChange={handleChange}/>
                    </div>
                    <div className="col-span-2">
                        <TextFieldBusiness title={"Phone"} name="phone" value={formData.phone}  onChange={handleChange}/>
                    </div>
                    <div>
                        <TextFieldBusiness title={"Province"} name="province" value={formData.province}  onChange={handleChange}/>
                    </div>
                    <div>
                        <TextFieldBusiness title={"District"} name="district" value={formData.district}  onChange={handleChange}/>
                    </div>
                    <div className="col-span-2">
                        <label className="block font-medium">Upload certificatet document</label>
                        <input type="text" className="p-2 w-1/2 mt-2 text-xl border rounded-md" />
                        <button className="bg-blue-400 p-2 m-4 rounded-full hover:bg-blue-800 cursor-pointer">
                            <h1 className="text-white font-bold">Upload</h1>
                        </button>
                    </div>
                    <div>
                        <TextFieldBusiness title={"Sub-district"} name="subDistrict" value={formData.subDistrict}  onChange={handleChange}/>
                    </div>
                    <div>
                        <TextFieldBusiness title={"Postal Code"} name="postalCode" value={formData.postalCode}  onChange={handleChange}/>
                    </div>

                    <div className="flex flex-col mt-2">
                        <label className="font-medium">Upload Business image</label>
                        <div className="flex w-32 h-32 mt-2 ml-8 bg-gray-400 rounded-md items-center justify-center">
                            <button className="bg-blue-400 p-2 m-4 rounded-full hover:bg-blue-800 cursor-pointer">
                                <h1 className="text-white font-bold">Upload</h1>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row mt-2 col-end-5 justify-center items-center">
                        <div>
                            <Link to={"/profile/mainBusiness"}>
                                <div className="flex text-center p-4 mx-4 bg-gray-600 rounded-2xl hover:bg-gray-800">
                                    <h2 className="text-white font-medium">Back</h2>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link>
                                <div onClick={handleSubmit} className="flex p-4 mx-4 bg-green-500 rounded-2xl hover:bg-green-700">
                                    <h2 className="text-white text-center font-medium">Confirm</h2>
                                </div>
                            </Link>
                        </div>
                        
                            
                </div>
                </form>
                
            </div>
        </div>
        
    );
} 

export default BusinessForm;

const BusinessSelector = (prop) => {
    const {selectedBusiness, onChange} = prop;

    const businesses = [
        { name: "Event", icon: faCalendarCheck },
        { name: "Hotel", icon: faHotel },
        { name: "Restaurant", icon: faUtensils },
        { name: "Logistic", icon: faCar },
    ];

    return(
        <div className="grid grid-cols-4 bg-gray-400 p-2 my-2 mx-40 rounded-md gap-4">
                {businesses.map((business) => (
                <div
                    key={business.name}
                    className={`relative flex flex-col items-center justify-center bg-white p-4 mx-4 rounded-md hover:bg-blue-400 cursor-pointer transition-all ${
                        selectedBusiness === business.name ? "bg-blue-500 text-black" : ""
                    }`}
                    onClick={() => onChange(business.name)}
                >
                    <FontAwesomeIcon icon={business.icon} size="4x" />
                    <h2 className="font-medium mt-2">{business.name}</h2>

                    {selectedBusiness === business.name && (
                        <FontAwesomeIcon icon={faCircleCheck} className="absolute top-2 right-2 text-green-600" size="lg" />
                    )}
                </div>
            ))}
        </div>
    );
}

const TextFieldBusiness = (prop) => {
    const {title, name, value, onChange} = prop;
    return(
        <div>
            <label className="block font-medium">{title}</label>
            <input
                type="text"
                name={name} //กำหนด name ให้ input
                value={value}
                onChange={onChange} //ใช้ onChange ที่ส่งเข้ามา
                className="p-2 w-2/3 mt-2 text-xl border rounded-md"
            />
        </div> 
    );
}


