import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const QuotationPage = () => {
    const [activeTab, setActiveTab] = useState("Pending Quotations");

    return (
        <div className='flex flex-5 flex-col bg-gradient-to-b from-gray-50 to-white'>
            <div className='gap-5 m-20'>
                <div className="text-3xl font-bold text-gray-800 mb-7">
                    <span className="inline-block border-b-2 border-amber-500 pb-2">Quotation</span>
                </div>
                
                {/* Tabs */}
                <div className='flex rounded gap-5'>
                    {["Pending Quotations", "Received Quotations", "Completed Quotations"].map((tab) => (
                        <div 
                            key={tab} 
                            className={`px-5 py-2 rounded-t-lg cursor-pointer transition-all duration-300 ${
                                activeTab === tab 
                                ? 'bg-gray-500 text-white font-semibold shadow-md' 
                                : 'bg-[#D9D9D9] hover:bg-gray-300 text-gray-700'
                            }`} 
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className='gap-5 bg-white p-10 shadow-md rounded-b-md rounded-r-md overflow-hidden'>
                    <div className="grid grid-cols-4 border-b-2 pb-3 text-center mb-3 text-gray-700 font-medium">
                        <p>Business Name</p>
                        <p>Quotation date</p>
                        <p>Status</p>
                        <p className='text-end mr-20'>Operation</p>
                    </div>
                    {activeTab === "Pending Quotations" && <QuotationList status="userId" />}
                    {activeTab === "Received Quotations" && <QuotationList status="businessId" />}
                    {activeTab === "Completed Quotations" && <QuotationList status="Complete" />}
                </div>
            </div>
        </div>
    );
};

const QuotationList = (prop) => {
    const { status } = prop;
    console.log(status);
    const data = [
        { business: "Talay Hotel and Villa, Cha Am", date: "5/2/2568", status: "refuse" },
        { business: "Talay Hotel and Villa, Cha Am", date: "6/2/2568", status: "waiting for pay" },
        { business: "Talay Hotel and Villa, Cha Am", date: "10/2/2568", status: "Pending" }
    ];

    return (
        <div className="space-y-3">
            {data.map((item, index) => (
                <Quotationfield 
                    key={index} 
                    business={item.business} 
                    date={item.date} 
                    status={item.status} 
                    isEven={index % 2 === 0} 
                />
            ))}
        </div>
    );
};

const Quotationfield = (prop) => {
    const { business, date, status, isEven } = prop;
    
    // Status styling
    const getStatusStyle = (status) => {
        switch(status.toLowerCase()) {
            case "refuse":
                return "bg-red-50 text-red-700";
            case "waiting for pay":
                return "bg-amber-50 text-amber-700";
            case "pending":
                return "bg-blue-50 text-blue-700";
            default:
                return "bg-gray-50 text-gray-700";
        }
    };
    
    return (
        <div className={`grid grid-cols-4 text-center p-3 border border-gray-100 rounded-lg ${isEven ? "bg-gray-100" : "bg-gray-50"} transition-all duration-300 hover:shadow-lg`}>
            <p className="font-medium text-gray-800">{business}</p>    
            <p className="text-gray-600">{date}</p>  
            <div className="flex justify-center items-center">
                <span className={`text-xs px-2 py-1 rounded-full uppercase tracking-wider ${getStatusStyle(status)}`}>
                    {status}
                </span>
            </div>     
            <div className="flex justify-end gap-5 mr-20">
                {status.toLowerCase() === "waiting for pay" && 
                    <QuotationEditBtn icon={faDollarSign} popup="Payment" color="text-amber-500" />
                }
                <QuotationEditBtn icon={faPenToSquare} popup="Edit" color="text-blue-500" />
                <QuotationEditBtn icon={faTrash} popup="Delete" color="text-red-500" />
            </div>    
        </div>
    );
};

const QuotationEditBtn = (prop) => {
    const { icon, popup, color = "text-gray-600" } = prop;
    const [isMouseEnter, setIsMouseEnter] = useState(false);

    return (
        <div 
            onMouseEnter={() => setIsMouseEnter(true)} 
            onMouseLeave={() => setIsMouseEnter(false)} 
            className="flex justify-center w-fit h-fit items-center relative cursor-pointer"
        >
            <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${color} hover:bg-gray-100`}>
                <FontAwesomeIcon icon={icon} />
            </div>
            
            {isMouseEnter && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md z-50 whitespace-nowrap">
                    {popup}
                </div>
            )}
        </div>
    );
};

export default QuotationPage;