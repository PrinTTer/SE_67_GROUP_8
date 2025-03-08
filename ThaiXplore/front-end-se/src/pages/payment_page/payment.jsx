import BookingDetail from "../booking_page/component/bookingDetail";
import { PaymentUserDetail } from "./component/paymentUserDetail";

const Payment = () => {
    return(
        <>
            <div className="flex flex-[1.2]">
                <BookingDetail/>
            </div>
            <div className="flex flex-[3.8] bg-gray-100">
                <div className="flex flex-1 flex-col w-auto h-auto bg-white p-4 m-8 rounded-md shadow-gray-600 shadow-md gap-6">
                    <div className="flex flex-[2.5] flex-col border-1 border-blue-400 rounded-xs shadow-gray-400 mx-4 shadow-md">
                        <div className="w-auto bg-[#75A0F5]">
                            <h1 className="font-bold text-2xl text-white mx-4">Add Card Detail</h1>
                        </div>
                        <div className="grid grid-cols-3 my-2 mx-4 gap-4">            
                            <div className="col-span-3">
                                <PaymentForm label={"Name on Card"} word={"Sutthipat Pramnoi"}/>
                            </div>
                            <div className="col-span-3">
                                <PaymentForm label={"Credit Card Number"} word={"XXXX XXXX XXXX XXXX"}/>
                            </div>
                            <PaymentForm label={"Valid Until"} word={"MM/YY"}/>
                            <PaymentForm label={"CVC Number"} word={"XXX"}/>

                        </div>
                    </div>
                    <div className="flex flex-[2.5] flex-col border-1 border-blue-400 rounded-xs shadow-gray-400 mx-4 shadow-md">
                        <div className="w-auto bg-[#75A0F5]">
                            <h1 className="font-bold text-2xl text-white mx-4">Detail</h1>
                        </div>
                        <div className="flex flex-1 ">
                            <div className="flex flex-3">                              
                                <PaymentUserDetail/>
                            </div>
                            <div className="flex flex-1 items-center justify-center">
                                <div className="border w-50 h-60 mb-4 rounded-md"></div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-1 border-1 border-blue-400 rounded-xs shadow-gray-400 mx-4 shadow-md">
    
                    </div>
                </div>

            </div>
        </>
    );
}

export default Payment;

export const PaymentForm = (prop) => {
    const {label,word} = prop;

    return(
        <div className="flex flex-col">
            <hi className="font-bold">{label}</hi>
            <input type="text" className="w-2/3 p-2 mt-1 text-xl border rounded-lg" placeholder={word}/>
        </div>
    );
}
