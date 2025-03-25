import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircleArrowLeft, faCoins, faDollarSign, faFile, faFilePen, faPenToSquare, faReceipt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import { deleteData, fetchData, putData } from '../../services/apiService';
import { QuotationPopUp } from '../detail_page/component/QuotationPopUp';
import useSocket from '../../hooks/useSocket';
import { useSelector } from 'react-redux';

const QuotationPage = () => {
    const { user } = useSelector((state) => state.auth);
    const socketRef = useSocket(user); // เชื่อมต่อกับ WebSocket
    const [activeTab, setActiveTab] = useState("Pending Quotations");
    const [pendedQuotation, setPendedQuotation] = useState([]);
    const [receivedQuotation, setReceivedQuotation] = useState([]);
    const [completeQuotation, setCompleteQuotation] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const socket = socketRef.current;

        if (socket) {
            socket.on("newRequest", (data) => {
                console.log("data--->", data);
                fetch();
            });
        }

        return () => {
            if (socket) {
                socket.off("newRequest");
            }
        };
    }, [socketRef.current]);


    const fetch = async () => {
        try {
            setLoading(true);
            const pend = await fetchData("/quotations-pended");
            const pended = pend.filter((item, index) => item.status !== "complete");
            setPendedQuotation(pended);
            const received = await fetchData("/quotations-received");
            const receivedPending = received.filter((item, index) => item.status !== "complete");
            const receivedComplete = received.filter((item, index) => item.status === "complete");
            setReceivedQuotation(receivedPending);
            const completed = pend.filter((item, index) => item.status === "complete");
            receivedComplete.map((item, idx) => {
                completed.push(item);
            })
            setCompleteQuotation(completed);
        } catch (error) {
            console.log(error);
            setError(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetch();
    }, []);

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
                            className={`px-5 py-2 rounded-t-lg cursor-pointer transition-all duration-300 ${activeTab === tab
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
                    {activeTab === "Pending Quotations" && <QuotationList socketRef={socketRef} loading={loading} status="pending" quotations={pendedQuotation} setLoading={setLoading} />}
                    {activeTab === "Received Quotations" && <QuotationList socketRef={socketRef} loading={loading} status="received" quotations={receivedQuotation} setLoading={setLoading} />}
                    {activeTab === "Completed Quotations" && <QuotationList socketRef={socketRef} loading={loading} status="complete" quotations={completeQuotation} setLoading={setLoading} />}
                </div>
            </div>
        </div>
    );
};

const QuotationList = (prop) => {
    const { status, quotations, loading, setLoading, socketRef } = prop;
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(quotations);
    }, [quotations])

    return (
        <div className="space-y-3">
            {data.map((item, index) => (
                <Quotationfield
                    socketRef={socketRef}
                    key={index}
                    type={status}
                    business={item.companyName}
                    status={item.status}
                    isEven={index % 2 === 0}
                    quotation={item}
                    loading={loading}
                    setLoading={setLoading}
                />
            ))}
        </div>
    );
};

const Quotationfield = (prop) => {
    const { business, status, isEven, quotation, loading, setLoading, type, socketRef } = prop;
    const [details, setDetails] = useState({});
    // Status styling
    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
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

    const fetch = async () => {
        try {
            setLoading(true);
            const data = await fetchData(`/businesses/${quotation.toBusinessId}`);
            setDetails(data);
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetch();
    }, []);


    const dateString = quotation.date;
    const formatDate = new Date(dateString);

    const formattedDate = new Intl.DateTimeFormat("en-GB").format(formatDate);

    return (
        !loading ?
            <div className={`grid grid-cols-4 text-center p-3 rounded-lg ${isEven ? "bg-gray-100" : "bg-gray-50"} transition-all duration-300 hover:shadow-lg`}>
                <p className="font-medium text-gray-800">{details?.business?.businessName}</p>
                <p className="text-gray-600">{formattedDate}</p>
                <div className="flex justify-center items-center">
                    <span className={`text-xs px-2 py-1 rounded-full uppercase tracking-wider ${getStatusStyle(status)}`}>
                        {status}
                    </span>
                </div>
                <div className="flex justify-end gap-5 mr-20">
                    {
                        type === "pending" ?
                            status !== "offered" ?
                                <QuotationEditBtn socketRef={socketRef} icon={faPenToSquare} type={type} popup="Edit" color="text-blue-500" business={details} quotation={quotation} /> :
                                <QuotationEditBtn socketRef={socketRef} icon={faCoins} type={type} popup="Offer" color="text-yellow-500" business={details} quotation={quotation} fetch={fetch} />
                            : type === "received" ?
                                status === "offered" ?
                                    <QuotationEditBtn socketRef={socketRef} icon={faFile} type={type} popup="Offer" color="text-gray-500" business={details} quotation={quotation} /> :
                                    <QuotationEditBtn socketRef={socketRef} icon={faFilePen} type={type} popup="Edit" color="text-blue-500" business={details} quotation={quotation} fetch={fetch} />
                            : type === "complete" ?
                                status === "offered" ?
                                    <QuotationEditBtn socketRef={socketRef} icon={faReceipt} type={type} popup="Edit" color="text-blue-500" business={details} quotation={quotation} /> :
                                    <QuotationEditBtn socketRef={socketRef} icon={faReceipt} type={type} popup="Offer" color="text-gray-500" business={details} quotation={quotation} fetch={fetch} />
                            :
                            <></>
                        
                        
                    }
                    <QuotationEditBtn socketRef={socketRef} icon={faTrash} type={type} popup="Delete" color="text-red-500" business={details} quotation={quotation} fetch={fetch} />
                </div>
            </div>
            :
            <div></div>
    );
};

const QuotationEditBtn = (prop) => {
    const { icon, popup, color = "text-gray-600", business, quotation, fetch, type, socketRef } = prop;
    const [showPopup, setShowPopup] = useState(false);


    const checkBtn = async () => {
        if (popup === "Edit") {
            setShowPopup(true)
        } else if (popup === "Delete") {
            try {
                await deleteData(`/quotations/${quotation._id}`);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        } else if (popup === "Offer") {
            setShowPopup(true)
        }
    }

    // console.log(quotation);
    // console.log("Business",business);
    return (
        <>

            {showPopup && (popup === "Edit" || popup === "Offer") && <QuotationPopUp socketRef={socketRef} popup={popup} type={type} business={business} onClose={() => setShowPopup(false)} serviceBusiness={business?.services} quotation={quotation} />}

            <div
                onClick={() => checkBtn()}
                className="flex justify-center w-fit h-fit items-center relative cursor-pointer"
            >
                <div className={`w-8 h-8 flex text-xl items-center justify-center rounded-full transition-all duration-300 ${color} hover:bg-gray-100`}>
                    <FontAwesomeIcon icon={icon} />
                </div>
            </div>
        </>
    );
};

export default QuotationPage;