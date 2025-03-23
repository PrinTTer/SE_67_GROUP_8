import { useEffect, useState } from "react";
import { CreateInformation } from "../../../components/informationBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCarSide, faPersonHiking, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { UploadDocumentBlock } from "./UploadDocumentBlock";
import { Link, useNavigate } from "react-router-dom";
import { postData, postDataWithFiles } from "../../../services/apiService";

export const BusinessInformation = () => {
    const [category, setCategory] = useState("hotel");
    const [address, setAddress] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [subDistrict, setSubDistrict] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [uploadDocument, setUpLoadDocument] = useState([]);
    const [dataForm, setDataForm] = useState({
        businessName: "",
        description: "",
        address: "",
        phoneNumber: "",
        email: "",
        category: "",
        verify: {
            status: "pending",
            document: []
        }
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "businessName") {
            setDataForm((prev) => ({ ...prev, businessName: value }));
        } else if (id === "description") {
            setDataForm((prev) => ({ ...prev, description: value }));
        } else if (id === "phoneNumber") {
            setDataForm((prev) => ({ ...prev, phoneNumber: value }));
        } else if (id === "email") {
            setDataForm((prev) => ({ ...prev, email: value }));
        } else if (id === "address") {
            setAddress((prev) => ({ ...prev, value }));
        } else if (id === "province") {
            setProvince((prev) => ({ ...prev, value }));
        } else if (id === "district") {
            setDistrict((prev) => ({ ...prev, value }));
        } else if (id === "subDistrict") {
            setSubDistrict((prev) => ({ ...prev, value }));
        } else if (id === "postalCode") {
            setPostalCode((prev) => ({ ...prev, value }));
        }
    }



    useEffect(() => {
        setDataForm((prev) => ({
            ...prev,
            address: `${address.value} ${subDistrict.value} ${district.value} ${province.value} ${postalCode.value}`,
            category: category,
        }));
    },[category , address , subDistrict , district , province ,postalCode])

    const onSubmit = async () => {
        try {
            await postDataWithFiles("/businesses/" ,uploadDocument, dataForm, "businesses_verifies");
            navigate("/profile/mainbusiness");
        } catch (error) {
            console.log(error);
        }
        
    }

    
    return (
        <div>
            <div className="flex flex-col my-4 mx-20">
                <div className="text-xl mb-4">
                    Business Informations
                </div>
                <div className="flex flex-col gap-5">
                    <CreateInformation title={"Business Name"} handleChange={handleChange} id={"businessName"} />
                    <CreateInformation title={"Descriptions"} handleChange={handleChange} id={"description"} />

                    <div className="bg-white flex justify-between px-10 py-5 w-5xl drop-shadow-lg rounded-md">
                        <div className="flex flex-col gap-10 w-full">
                            <div className="font-semibold">
                                Category
                            </div>
                            <div className="flex justify-evenly">

                                <div onClick={() => setCategory("hotel")} className="flex flex-col gap-2 justify-center cursor-pointer">
                                    <div className="flex justify-center">
                                        <div className={`${category === 'hotel' ? "text-blue-400" : "text-gray-400"} flex justify-center p-5  rounded-full w-fit h-fit`}>
                                            <FontAwesomeIcon icon={faBed} size="xl" />
                                            <div className={` ${category === 'hotel' ? "border-blue-400" : ""} absolute bottom-10 border p-10 rounded-full`}></div>
                                        </div>
                                    </div>
                                    <div className={`${category === 'hotel' ? "text-blue-400" : "text-gray-400"} text-sm`}>
                                        Hotels & Homes
                                    </div>
                                </div>

                                <div onClick={() => setCategory("carRental")} className="flex flex-col gap-2 justify-center cursor-pointer">
                                    <div className="flex justify-center">
                                        <div className={`${category === 'carRental' ? "text-blue-400" : "text-gray-400"} flex justify-center p-5  rounded-full w-fit h-fit`}>
                                            <FontAwesomeIcon icon={faCarSide} size="xl" />
                                            <div className={` ${category === 'carRental' ? "border-blue-400" : ""} absolute bottom-10 border p-10 rounded-full`}></div>
                                        </div>
                                    </div>
                                    <div className={`${category === 'carRental' ? "text-blue-400" : "text-gray-400"} text-sm`}>
                                        Car Rentals
                                    </div>
                                </div>

                                <div onClick={() => setCategory("restaurant")} className="flex flex-col gap-2 justify-center cursor-pointer">
                                    <div className="flex justify-center">
                                        <div className={`${category === 'restaurant' ? "text-blue-400" : "text-gray-400"} flex justify-center p-5  rounded-full w-fit h-fit`}>
                                            <FontAwesomeIcon icon={faUtensils} size="xl" />
                                            <div className={` ${category === 'restaurant' ? "border-blue-400" : ""} absolute bottom-10 border p-10 rounded-full`}></div>
                                        </div>
                                    </div>
                                    <div className={`${category === 'restaurant' ? "text-blue-400" : "text-gray-400"} text-sm`}>
                                        Restaurants
                                    </div>
                                </div>

                                <div onClick={() => setCategory("event")} className="flex flex-col gap-2 justify-center cursor-pointer">
                                    <div className="flex justify-center">
                                        <div className={`${category === 'event' ? "text-blue-400" : "text-gray-400"} flex justify-center p-5  rounded-full w-fit h-fit`}>
                                            <FontAwesomeIcon icon={faPersonHiking} size="xl" />
                                            <div className={` ${category === 'event' ? "border-blue-400" : ""} absolute bottom-10 border p-10 rounded-full`}></div>
                                        </div>
                                    </div>
                                    <div className={`${category === 'event' ? "text-blue-400" : "text-gray-400"} text-sm`}>
                                        Activities & Events
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CreateInformation title={"Email Contact"} placeholder={"example@gmail.com"} handleChange={handleChange} id={"email"} />
                    <CreateInformation title={"Phone Number"} handleChange={handleChange} id={"phoneNumber"} />
                    <div className="bg-white flex justify-between px-10 py-5 w-5xl drop-shadow-lg rounded-md">
                        <div className="flex flex-col gap-2">
                            <div className="font-semibold">
                                Address
                            </div>
                            <div className="border border-gray-300 rounded-md">
                                <input id="address" onChange={handleChange} className="focus:outline-0 px-4 py-2 w-xl" type="text" placeholder="Address" />
                            </div>
                            <div className="border border-gray-300 rounded-md">
                                <input id="subDistrict" onChange={handleChange} className="focus:outline-0 px-4 py-2 w-xl" type="text" placeholder="Sub District" />
                            </div>
                            <div className="border border-gray-300 rounded-md">
                                <input id="district" onChange={handleChange} className="focus:outline-0 px-4 py-2 w-xl" type="text" placeholder="District" />
                            </div>
                            <div className="border border-gray-300 rounded-md">
                                <input id="province" onChange={handleChange} className="focus:outline-0 px-4 py-2 w-xl" type="text" placeholder="Province" />
                            </div>
                            <div className="border border-gray-300 rounded-md">
                                <input id="postalCode" onChange={handleChange} className="focus:outline-0 px-4 py-2 w-xl" type="text" placeholder="Postal Code" />
                            </div>
                        </div>
                    </div>

                    <UploadDocumentBlock handleChange={handleChange} setUpLoadDocument={setUpLoadDocument} uploadDocument={uploadDocument} id={"document"} />

                    <div className="bg-white flex justify-between px-10 py-5 w-5xl drop-shadow-lg rounded-md">
                        <div className="flex w-full justify-end gap-2">
                            <div onClick={onSubmit} className="flex px-3 py-2 bg-green-400 transition-all text-white hover:bg-green-300 w-fit h-fit cursor-pointer rounded-md">
                                Submit
                            </div>
                            <Link to="/profile/mainbusiness">
                                <div className="flex px-3 py-2 bg-red-400 text-white transition-all hover:bg-red-300 w-fit h-fit cursor-pointer rounded-md">
                                    Cancel
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}