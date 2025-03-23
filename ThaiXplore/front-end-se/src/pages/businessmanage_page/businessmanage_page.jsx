import React, { useState, useEffect } from "react";
import { fetchData } from "../../services/apiService";
import BoxBusiness from "./component/box_business";

const VerifyBusiness = () => {
    const [activeTab, setActiveTab] = useState("New Request");
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        const getBusinesses = async () => {
            setLoading(true);
            try {
                const result = await fetchData("/businesses");
                setBusinesses(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getBusinesses();
    }, []);

    const filteredBusinesses = businesses.filter(business => {
        if (activeTab === "New Request") {
            return business.verify?.status === "pending";
        } else {
            return business.verify?.status === "approved";
        }
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBusinesses.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredBusinesses.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex flex-5 items-center flex-col p-6">
            <h2 className='text-2xl font-bold mb-6 text-center'>Business Management</h2>

            {/* Tabs */}
            <div className='flex gap-5 mb-5'>
                {['New Request', 'All business'].map(tab => (
                    <div
                        key={tab}
                        className={`px-5 py-2 rounded-t-lg cursor-pointer ${activeTab === tab ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                    >
                        {tab} <span className='ml-1 font-bold text-blue-700'>{tab === "New Request" && businesses.filter(b => b.verify?.status === "pending").length}</span>
                    </div>
                ))}
            </div>

            {/* Container Box */}
            <div className='flex gap-5 flex-col w-full  bg-white p-6 rounded-md shadow border border-gray-300 px-20'>
                {loading && <p>Loading...</p>}
                {error && <p className='text-red-500'>Error: {error}</p>}

                {!loading && currentItems.length === 0 && (
                    <p className='text-center text-gray-400'>No businesses found.</p>
                )}

                <div className="flex flex-col gap-4">
                    {currentItems.map((business, index) => (
                        <BoxBusiness key={business._id || index} data={business} />
                    ))}
                </div>

                {/* Pagination */}
                {filteredBusinesses.length > itemsPerPage && (
                    <div className="flex justify-center mt-6 items-center gap-10">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
                        >
                            Previous
                        </button>
                        <span className="text-gray-700">
                            Page {currentPage} of {Math.ceil(filteredBusinesses.length / itemsPerPage)}
                        </span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === Math.ceil(filteredBusinesses.length / itemsPerPage)}
                            className={`px-4 py-2 rounded ${currentPage === Math.ceil(filteredBusinesses.length / itemsPerPage) ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            
        </div>
    );
};

export default VerifyBusiness;
