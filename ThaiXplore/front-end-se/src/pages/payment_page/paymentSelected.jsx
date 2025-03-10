import BookingDetail from "../booking_page/component/bookingDetail";
import { Link } from "react-router-dom";

const PaymentSelector = () => {
    
    return(
        <>
            <div className="flex flex-[1.2]">
                <BookingDetail/>
            </div>
            <div className="flex flex-[3.8] bg-gray-100">
                <div className="flex flex-1 flex-col w-full h-80 bg-white border border-gray-200 p-8 m-8 shadow-gray-600 shadow-md">
                    <div className="flex flex-[0.5] items-center">
                        <p className="text-xl">How would you like to pay?</p>
                    </div>
                    <div className="flex flex-2 items-center mt-4 gap-4">
                        <Link to={"/payment"}>
                            <button className="p-4 w-36 h-24 border rounded-lg bg-white shadow-md hover:bg-gray-200 hover:cursor-pointer">
                                <img className="w-auto h-auto" src="/src/assets/visa-logo.jpg"/>
                            </button>
                        </Link>
                        
                        <Link to={"/payment"}>
                            <button className="p-4 w-36 h-24 border rounded-lg bg-white shadow-md hover:bg-gray-200 hover:cursor-pointer">
                                <img className="w-auto h-auto" src="/src/assets/paypal.jpg"/>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentSelector;

