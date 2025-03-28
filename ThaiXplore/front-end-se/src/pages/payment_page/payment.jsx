import { useState } from "react";
import BookingDetail from "../booking_page/component/bookingDetail";
import { useLocation, useNavigate } from "react-router-dom";
import { PaymentUserDetail } from "./component/paymentUserDetail";
import { postData, putData } from "../../services/apiService";
import useSocket from "../../hooks/useSocket";
import { useSelector } from "react-redux";
import PackageDetail from "../booking_page/component/packageDetail";

const Payment = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { bookingData, item, category, method, bookingDetail } =
    location.state || {};
  const navigate = useNavigate();
  const socketRef = useSocket(user); // เชื่อมต่อกับ WebSocket


  const checkBookingType = () => {
    if (bookingDetail?.type === "package") {
      return bookingDetail?.total;
    } else if (
      Array.isArray(item?.services) &&
      bookingDetail?.type !== "package"
    ) {
      return item?.quotation.total;
    } else {
      return (
        item?.price * bookingDetail?.bookingAmount * bookingDetail?.AmountDay
      );
    }
  };

  // สร้าง state สำหรับฟอร์มข้อมูลการชำระเงิน
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState("");

  // เตรียมข้อมูลที่จะส่งไปยัง API
  const formData = {
    businessId: item?.businessId, // ใช้ businessId จาก bookingData
    status: "confirmed",
    bookingType: "normal",
    bookingTransaction: {
      paymentMethod: method, // method จะเป็น "credit card" หรือ "paypal"
      transactionDate: new Date().toISOString(), // วันที่ทำธุรกรรม
    },
    description: bookingData?.description, // รายละเอียดการจอง
    bookingDetail: [
      {
        serviceId: item?._id, // serviceId ที่เกี่ยวข้องกับ booking
        startDate: new Date(bookingData?.checkInDate).toISOString(),
        endDate: new Date(bookingData?.checkOutDate).toISOString(),
        amount: bookingDetail?.bookingAmount,
      },
    ],
  };

  const sendQuotationSocket = (status) => {
    const socket = socketRef.current;
    const receiverId = bookingDetail.user_Id;
    if (socket) {
      socket.emit("sendRequest", { receiverId, status }); // ส่งข้อมูลไปยัง server ผ่าน WebSocket
    }
  };

  const sendQuotationSocketToPender = (status) => {
    const socket = socketRef.current;
    const receiverId = item.quotation.userId;
    if (socket) {
      socket.emit("sendRequest", { receiverId, status }); // ส่งข้อมูลไปยัง server ผ่าน WebSocket
    }
  };

  // ฟังก์ชันสำหรับ handle การกดยืนยันการชำระเงิน
  const handleConfirmPayment = async () => {
    // Validate form fields
    if (!cardName || !/^[a-zA-Z\s]+$/.test(cardName)) {
      setError("Please enter a valid name on the card.");
      return;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      setError("Please enter a valid 16-digit card number.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(validUntil)) {
      setError("Please enter a valid expiration date (MM/YY).");
      return;
    }
    if (!/^\d{3}$/.test(cvc)) {
      setError("Please enter a valid 3-digit CVC.");
      return;
    }

    setError(""); // Clear any existing errors

    try {
        //paymentType ---> packages
      if (bookingDetail?.type === "package") {
        const body = {
          packageId: bookingDetail?.package[bookingDetail?.package.length-2]?._id,
          amount: 1,
          paymentMethod: method,
        };
        const result = await postData("/users/packages", body);
        navigate("/packageHistory");
        //paymentType ---> quotations
      } else if (
        Array.isArray(item.services) &&
        bookingDetail?.type !== "package"
      ) {
        const sendData = {
          transaction: {
            transactionDate: new Date().toISOString(),
            paymentMethod: method,
          },
          status: "complete",
        };
        const response = await putData(
          `/quotations/${item?.quotation._id}`,
          sendData
        );
        sendQuotationSocket({ request: "Create" });
        sendQuotationSocketToPender({ request: "Create" });
        navigate("/quotation");
        //paymentType ----> normalBooking payment
      } else {
        const response = await postData("/bookings", formData);
        console.log("Payment confirmed:", response);

        navigate("/history");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };

  return (
    <>
      <div className="flex flex-[1.2]">
        {bookingDetail?.type === "package" ? (
          <PackageDetail item={item} category={category} />
        ) : (
          <BookingDetail item={item} category={category} />
        )}
      </div>
      <div className="flex flex-[3.8] bg-gray-50">
        <div className="flex flex-1 flex-col w-auto h-auto bg-white p-4 m-8 rounded-lg shadow-lg gap-6">
          {/* Error Message */}
          {error && <div className="text-red-500">{error}</div>}

          <div className="flex flex-[2.5] flex-col border border-gray-100 rounded-lg shadow-md overflow-hidden">
            <div className="w-auto bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
              <h1 className="font-bold text-xl text-white">Card Details</h1>
            </div>
            <div className="grid grid-cols-3 p-6 gap-4">
              <div className="col-span-3">
                <PaymentForm
                  label={"Name on Card"}
                  word={"Sutthipat Pramnoi"}
                  value={cardName}
                  setValue={setCardName}
                />
              </div>
              <div className="col-span-3">
                <PaymentForm
                  label={"Credit Card Number"}
                  word={"XXXX XXXX XXXX XXXX"}
                  value={cardNumber}
                  setValue={setCardNumber}
                  limit={16}
                />
              </div>
              <div>
                <PaymentForm
                  label={"Valid Until"}
                  word={"MM/YY"}
                  value={validUntil}
                  setValue={setValidUntil}
                  limit={5}
                />
              </div>
              <div>
                <PaymentForm
                  label={"CVC Number"}
                  word={"XXX"}
                  value={cvc}
                  setValue={setCvc}
                  limit={3}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-[2.5] flex-col border border-gray-100 rounded-lg shadow-md overflow-hidden">
            <div className="w-auto bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
              <h1 className="font-bold text-xl text-white">Customer Details</h1>
            </div>
            <div className="flex flex-1 p-4">
              <div className="flex flex-3 w-full">
                <PaymentUserDetail
                  user={bookingData}
                  bookingDetail={bookingDetail}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col border border-gray-100 rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-1 justify-between items-center px-6 py-4 border-b border-gray-100">
              <h1 className="font-bold text-xl text-gray-800">Total Amount</h1>
              <h1 className="font-bold text-xl text-amber-600">
                THB {checkBookingType()} ฿
              </h1>
            </div>
            <div className="flex flex-1 justify-center items-center p-6">
              <button
                onClick={handleConfirmPayment} // เรียกใช้งานฟังก์ชัน confirm payment
                className="flex justify-center items-center w-1/2 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md"
              >
                <p className="text-center text-lg font-semibold text-white">
                  Confirm Payment
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;

export const PaymentForm = (prop) => {
  const { label, word, value, setValue, limit } = prop;

  return (
    <div className="flex flex-col">
      <label className="font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
        placeholder={word}
        value={value} // ใช้ value ที่ถูกเก็บใน state
        maxLength={limit}
        onChange={(e) => setValue(e.target.value)} // เมื่อกรอกข้อมูลให้เปลี่ยนค่าใน state
      />
    </div>
  );
};
