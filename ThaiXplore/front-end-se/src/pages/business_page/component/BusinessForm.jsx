import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons"
import { faHotel,faUtensils, faCar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const BusinessForm = () => {
    
    return(
        <div className="flex flex-1 w-full h-full bg-gray-200 items-center justify-center">
            <div className="w-19/20 h-19/20 p-10 bg-white border-1 shadow-black shadow-md">
                <div>
                    <label className="block text-xl font-bold">Business</label>
                    <input type="text" className="p-2 mt-2 text-xl border rounded-md" />
                </div>
                <div className="flex flex-col mt-2">
                    <label className="text-xl font-bold">Main Business</label>
                        <div className="grid grid-cols-4 bg-gray-400 p-2 my-2 mx-60 rounded-md gap-4">
                            <div className="bg-white p-2 mx-4 flex flex-col items-center justify-center rounded-md hover:bg-blue-400">
                                <FontAwesomeIcon icon={faCalendarCheck} size="7x"/>
                                <h2 className="font-medium mt-1">Event</h2>
                            </div>
                            <div className="bg-white p-2 mx-4 flex flex-col items-center justify-center rounded-md hover:bg-blue-400">
                                <FontAwesomeIcon icon={faHotel} size="7x"/>
                                <h2 className="font-medium mt-1">Hotel</h2>
                            </div>
                            <div className="bg-white p-2 mx-4 flex flex-col items-center justify-center rounded-md hover:bg-blue-400">
                                <FontAwesomeIcon icon={faUtensils} size="7x"/>
                                <h2 className="font-medium mt-1">Restaurant</h2>
                            </div>
                            <div className="bg-white p-2 mx-4 flex flex-col items-center justify-center rounded-md hover:bg-blue-400">
                                <FontAwesomeIcon icon={faCar} size="7x"/>
                                <h2 className="font-medium mt-1">Logistic</h2>
                            </div>
                        </div>
                </div>
                <label className="text-xl font-bold">Detail</label>
                <form className="grid grid-cols-4 mt-2 mx-8 gap-4">
                    <div className="col-span-2">
                        <label className="block font-medium">Juristic ID 13 digits</label>
                        <input type="text" className="p-2 w-2/3 mt-2 text-xl border rounded-md" />
                    </div>
                    <div className="col-span-2">
                        <label className="block font-medium">Email Contact</label>
                        <input type="text" className="p-2 w-2/3 mt-2 text-xl border rounded-md" />
                    </div>
                    <div className="col-span-2">
                        <label className="block font-medium">Phone</label>
                        <input type="text" className="p-2 w-2/3 mt-2 text-xl border rounded-md" />
                    </div>
                    <div>
                        <label className="block font-medium">Province</label>
                        <input type="text" className="p-2 mt-2 text-xl border rounded-md" />
                    </div>
                    <div>
                        <label className="block font-medium">District</label>
                        <input type="text" className="p-2 mt-2 text-xl border rounded-md" />
                    </div>
                    <div className="col-span-2">
                        <label className="block font-medium">Upload certificatet document</label>
                        <input type="text" className="p-2 w-1/2 mt-2 text-xl border rounded-md" />
                        <button className="bg-blue-400 p-2 m-4 rounded-full hover:bg-blue-800 cursor-pointer">
                            <h1 className="text-white font-bold">Upload</h1>
                        </button>
                    </div>
                    <div>
                        <label className="block font-medium">Sub-district</label>
                        <input type="text" className="p-2 mt-2 text-xl border rounded-md" />
                    </div>
                    <div>
                        <label className="block font-medium">Postal Code</label>
                        <input type="text" className="p-2 mt-2 text-xl border rounded-md" />
                    </div>
                </form>
                <div className="flex flex-col mt-2">
                    <label className="ml-8 font-medium">Upload Business image</label>
                    <div className="flex w-32 h-32 mt-2 ml-8 bg-gray-400 rounded-md items-center justify-center">
                        <button className="bg-blue-400 p-2 m-4 rounded-full hover:bg-blue-800 cursor-pointer">
                            <h1 className="text-white font-bold">Upload</h1>
                        </button>
                    </div>
                </div>
                <div className="flex flex-row absolute bottom-16 right-20">
                    <Link to={"/profile/mainBusiness"}>
                        <div className="flex text-center p-4 mx-4 bg-gray-600 rounded-2xl hover:bg-gray-800">
                            <h2 className="text-white font-medium">Back</h2>
                        </div>
                    </Link>
                    <div className="flex justify-items-center p-4 mx-4 bg-green-500 rounded-2xl hover:bg-green-700">
                        <h2 className="text-white text-center font-medium">Confirm</h2>
                    </div>
                </div>
            </div>
        </div>
        
    );
} 

export default BusinessForm;
