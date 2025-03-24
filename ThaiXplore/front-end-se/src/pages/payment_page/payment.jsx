import { useLocation } from "react-router-dom";
import BookingDetail from "../booking_page/component/bookingDetail";
import { PaymentUserDetail } from "./component/paymentUserDetail";

const Payment = () => {
    const location = useLocation();
    const {bookingData, item, category} = location.state || {};
    return(
        <>
            <div className="flex flex-[1.2]">
                <BookingDetail item={item} category={category}/>
            </div>
            <div className="flex flex-[3.8] bg-gray-50">
                <div className="flex flex-1 flex-col w-auto h-auto bg-white p-4 m-8 rounded-lg shadow-lg gap-6">
                    <div className="flex flex-[2.5] flex-col border border-gray-100 rounded-lg shadow-md overflow-hidden">
                        <div className="w-auto bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
                            <h1 className="font-bold text-xl text-white">Card Details</h1>
                        </div>
                        <div className="grid grid-cols-3 p-6 gap-4">            
                            {/* ข้อมูล credit card ที่ลูกค้าต้องกรอก */}
                            <div className="col-span-3">
                                <PaymentForm label={"Name on Card"} word={"Sutthipat Pramnoi"}/>
                            </div>
                            <div className="col-span-3">
                                <PaymentForm label={"Credit Card Number"} word={"XXXX XXXX XXXX XXXX"}/>
                            </div>
                            <div>
                                <PaymentForm label={"Valid Until"} word={"MM/YY"}/>
                            </div>
                            <div>
                                <PaymentForm label={"CVC Number"} word={"XXX"}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-[2.5] flex-col border border-gray-100 rounded-lg shadow-md overflow-hidden">
                        <div className="w-auto bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
                            <h1 className="font-bold text-xl text-white">Customer Details</h1>
                        </div>
                        <div className="flex flex-1 p-4">
                            <div className="flex flex-3 w-full">        
                                {/*Detail จากลูกค้าที่กรอกข้อมูลเข้ามา*/}                      
                                <PaymentUserDetail user={bookingData}/> 
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-1 flex-col border border-gray-100 rounded-lg shadow-md overflow-hidden">
                        <div className="flex flex-1 justify-between items-center px-6 py-4 border-b border-gray-100">
                            <h1 className="font-bold text-xl text-gray-800">Total Amount</h1>
                            <h1 className="font-bold text-xl text-amber-600">THB {item?.price} ฿</h1>
                        </div>
                        <div className="flex flex-1 justify-center items-center p-6">
                            <button className="flex justify-center items-center w-1/2 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md">
                                <p className="text-center text-lg font-semibold text-white">Confirm Payment</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Payment;

export const PaymentForm = (prop) => {
    const {label, word} = prop;

    return(
        <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">{label}</label>
            <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200" 
                placeholder={word}
            />
        </div>
    );
}