import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const QuotationPage = () => {
    const [activeTab, setActiveTab] = useState("Pending Quotations");

    return (
        <div className='flex flex-5 flex-col bg-[#F3F4F6] '>
            <div className='gap-5 m-20'>
                <div className="text-2xl mb-7">Quotation</div>
                
                {/* Tabs */}
                <div className='flex rounded gap-5'>
                    {["Pending Quotations", "Received Quotations", "Completed Quotations"].map((tab) => (
                        <div 
                            key={tab} 
                            className={`px-5 py-2 rounded-t-lg cursor-pointer ${activeTab === tab ? 'bg-gray-500 text-white' : 'bg-[#D9D9D9]'}`} 
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className='gap-5 bg-white p-10 shadow-md rounded-b-md rounded-r-md'>
                    <div className="grid grid-cols-4 border-b-2 pb-3 text-center mb-3">
                        <p>Business Name</p>
                        <p>Quotation date</p>
                        <p>Status</p>
                        <p className='text-end mr-20'>Operation</p>
                    </div>
                    {activeTab === "Pending Quotations" && <QuotationList status="userId"     />}
                    {activeTab === "Received Quotations" && <QuotationList status="businessId"    />}
                    {activeTab === "Completed Quotations" && <QuotationList status="Complete"   />}
                </div>
            </div>
        </div>
    );
};
const QuotationList = (prop) => {
    const { status } = prop;
    console.log(status)
    const data = [
        { business: "Talay Hotel and Villa, Cha Am", date: "5/2/2568", status: "refuse" },
        { business: "Talay Hotel and Villa, Cha Am", date: "6/2/2568", status: "waiting for pay" },
        { business: "Talay Hotel and Villa, Cha Am", date: "10/2/2568", status: "Pending" }
    ];

    return (
        <>
            {data.map((item, index) => (
                <Quotationfield 
                    key={index} 
                    business={item.business} 
                    date={item.date} 
                    status={item.status} 
                    isEven={index % 2 === 0} 
                />
            ))}
        </>
    );
};

const Quotationfield = (prop) => {
    const { business, date, status, isEven } = prop
    return (
        <div className={`grid grid-cols-4 text-center p-2 ${isEven ? "bg-gray-300" : "bg-gray-100"}`}>
            <p>{business}</p>    
            <p>{date}</p>  
            <p>{status}</p>     
            <div className="flex justify-end gap-5 mr-20">
                {status === "waiting for pay" && <QuotationEditBtn icon={faDollarSign} popup={"Payment"} />}
                <QuotationEditBtn icon={faPenToSquare} popup={"Edit"} />
                
                <QuotationEditBtn icon={faTrash} popup={"Delete"} />
            </div>    
        </div>
    );
};


const QuotationEditBtn = (prop) => {
    const { icon, popup } = prop
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    return (
        <div 
            onMouseEnter={() => setIsMouseEnter(true)} 
            onMouseLeave={() => setIsMouseEnter(false)} 
            className="flex justify-center w-fit h-fit items-center drop-shadow-2xl cursor-pointer relative "
        >
            <div className=" text-xl">
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className={` ${isMouseEnter ? "bg-gray-100" : "bg-white"} rounded-full flex justify-center items-center absolute `}></div>
            <div className={`${isMouseEnter ? "flex" : "hidden"} transition-all absolute bg-gray-50 top-10 p-2 drop-shadow-2xl rounded-full z-50`}>
                <div className="text-gray-500">
                    {popup}
                </div>
            </div>
        </div>
    );
};

export default QuotationPage;
