import { useState } from "react";
import BookingDetail from "../booking_page/component/bookingDetail";
import { useLocation, useNavigate } from "react-router-dom";
import { PaymentUserDetail } from "./component/paymentUserDetail";
import { postData } from "../../services/apiService";

const Payment = () => {
    const location = useLocation();
    const { bookingData, item, category, method , bookingDetail } = location.state || {};
    const navigate = useNavigate();

    // สร้าง state สำหรับฟอร์มข้อมูลการชำระเงิน
    const [cardName, setCardName] = useState(""); 
    const [cardNumber, setCardNumber] = useState(""); 
    const [validUntil, setValidUntil] = useState(""); 
    const [cvc, setCvc] = useState("");

    

    console.log("item: ", item);
    console.log("pay with: ", method);

    // เตรียมข้อมูลที่จะส่งไปยัง API
    const formData = {
        businessId: item?.businessId,  // ใช้ businessId จาก bookingData
        status: "confirmed",
        bookingType: "normal",
        bookingTransaction: {
            paymentMethod: method,  // method จะเป็น "credit card" หรือ "paypal"
            transactionDate: new Date().toISOString(),  // วันที่ทำธุรกรรม
        },
        description: bookingData?.description,  // รายละเอียดการจอง
        bookingDetail: [
            {
                serviceId: item?._id,  // serviceId ที่เกี่ยวข้องกับ booking
                startDate: new Date(bookingData?.checkInDate).toISOString(),
                endDate: new Date(bookingData?.checkOutDate).toISOString(),
                amount: bookingDetail?.bookingAmount
            }
        ]
    };

    // ฟังก์ชันสำหรับ handle การกดยืนยันการชำระเงิน
    const handleConfirmPayment = async () => {
        try {
            // ส่งข้อมูลไปที่ API เพื่อบันทึกข้อมูลการจอง
            const response = await postData('/bookings', formData);
            // const response = formData;
            console.log('Payment confirmed:', response);
    
            // Redirect ไปยังหน้าที่ต้องการหลังจากการชำระเงินสำเร็จ
            navigate('/history');
        } catch (error) {
            console.error('Error confirming payment:', error);
        }
    };

    return (
        <>
            <div className="flex flex-[1.2]">
                <BookingDetail item={item} category={category} />
            </div>
            <div className="flex flex-[3.8] bg-gray-50">
                <div className="flex flex-1 flex-col w-auto h-auto bg-white p-4 m-8 rounded-lg shadow-lg gap-6">
                    <div className="flex flex-[2.5] flex-col border border-gray-100 rounded-lg shadow-md overflow-hidden">
                        <div className="w-auto bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
                            <h1 className="font-bold text-xl text-white">Card Details</h1>
                        </div>
                        <div className="grid grid-cols-3 p-6 gap-4">
                            <div className="col-span-3">
                                <PaymentForm label={"Name on Card"} word={"Sutthipat Pramnoi"} value={cardName} setValue={setCardName} />
                            </div>
                            <div className="col-span-3">
                                <PaymentForm label={"Credit Card Number"} word={"XXXX XXXX XXXX XXXX"} value={cardNumber} setValue={setCardNumber} limit={16}/>
                            </div>
                            <div>
                                <PaymentForm label={"Valid Until"} word={"MM/YY"} value={validUntil} setValue={setValidUntil} />
                            </div>
                            <div>
                                <PaymentForm label={"CVC Number"} word={"XXX"} value={cvc} setValue={setCvc} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-[2.5] flex-col border border-gray-100 rounded-lg shadow-md overflow-hidden">
                        <div className="w-auto bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
                            <h1 className="font-bold text-xl text-white">Customer Details</h1>
                        </div>
                        <div className="flex flex-1 p-4">
                            <div className="flex flex-3 w-full">
                                <PaymentUserDetail user={bookingData} bookingDetail={bookingDetail} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-1 flex-col border border-gray-100 rounded-lg shadow-md overflow-hidden">
                        <div className="flex flex-1 justify-between items-center px-6 py-4 border-b border-gray-100">
                            <h1 className="font-bold text-xl text-gray-800">Total Amount</h1>
                            <h1 className="font-bold text-xl text-amber-600">THB {item?.price*bookingDetail?.bookingAmount} ฿</h1>
                        </div>
                        <div className="flex flex-1 justify-center items-center p-6">
                            <button 
                                onClick={handleConfirmPayment}  // เรียกใช้งานฟังก์ชัน confirm payment
                                className="flex justify-center items-center w-1/2 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md"
                            >
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
    const { label, word, value, setValue, limit } = prop

    return (
        <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">{label}</label>
            <input 
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                placeholder={word}
                value={value}  // ใช้ value ที่ถูกเก็บใน state
                maxLength={limit}
                onChange={(e) => setValue(e.target.value)}  // เมื่อกรอกข้อมูลให้เปลี่ยนค่าใน state
            />
        </div>
    );
};
