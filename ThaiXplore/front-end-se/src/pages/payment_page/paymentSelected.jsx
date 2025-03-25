import BookingDetail from "../booking_page/component/bookingDetail";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

const PaymentSelector = () => {
    const [method, setMethod] = useState("");

    const location = useLocation();
    const { bookingData, item, category } = location.state || {};
    const navigate = useNavigate();

    console.log("Booking Data: ", bookingData);
    console.log("Service Detail: ", item);
    console.log("Category of Service: ", category);

    const handleSelect = (selectedMethod) => {
        setMethod(selectedMethod);  // Set the method (either "credit card" or "paypal")
        navigate('/payment', { state: { bookingData, item, category, method: selectedMethod } });  // Navigate with the method
    }

    return (
        <>
            <div className="flex flex-[1.2]">
                <BookingDetail item={item} category={category} />
            </div>
            <div className="flex flex-[3.8] bg-gray-50">
                <div className="flex flex-1 flex-col w-full bg-white border border-gray-100 rounded-lg shadow-lg p-8 m-8">
                    <div className="border-b border-gray-100 pb-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Select Payment Method</h2>
                        <p className="text-gray-600 mt-2">Choose your preferred payment option</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        <div 
                            onClick={() => handleSelect("credit card")}  // Pass method as "credit card"
                            className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md hover:border-amber-500 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mr-4 group-hover:bg-amber-100 transition-colors duration-300">
                                    <FontAwesomeIcon icon={faCreditCard} className="text-amber-500 text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Credit Card</h3>
                                    <p className="text-sm text-gray-500">Visa, Mastercard, Amex</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex space-x-2">
                                    <img className="h-6" src="/src/assets/visa-logo.jpg" alt="Visa" />
                                </div>
                                <span className="text-amber-600 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">Select →</span>
                            </div>
                        </div>

                        <div 
                            onClick={() => handleSelect("paypal")}  // Pass method as "paypal"
                            className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md hover:border-amber-500 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mr-4 group-hover:bg-amber-100 transition-colors duration-300">
                                    <FontAwesomeIcon icon={faWallet} className="text-amber-500 text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">PayPal</h3>
                                    <p className="text-sm text-gray-500">Fast and secure payment</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex space-x-2">
                                    <img className="h-6" src="/src/assets/paypal.jpg" alt="PayPal" />
                                </div>
                                <span className="text-amber-600 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">Select →</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                            <div className="text-gray-600">Total amount:</div>
                            <div className="text-xl font-bold text-amber-600">THB {item?.price} ฿</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentSelector;
