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
        <div className="flex flex-5 flex-col bg-white min-h-screen">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white py-6 px-8 shadow-md">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold">Business Management</h2>
                    {/* <p className="text-amber-100 mt-1">Review and verify business listings</p> */}
                </div>
            </div>

            <div className="max-w-6xl mx-auto w-full px-8 py-6">
                {/* Tabs */}
                <div className="flex border-b border-amber-200 mb-6">
                    {['New Request', 'All business'].map(tab => (
                        <div
                            key={tab}
                            className={`px-6 py-3 font-medium cursor-pointer transition-all duration-200 -mb-px ${
                                activeTab === tab 
                                    ? 'border-b-2 border-amber-600 text-amber-800 font-semibold' 
                                    : 'text-gray-600 hover:text-amber-700 hover:border-amber-200'
                            }`}
                            onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                        >
                            {tab} 
                            {tab === "New Request" && businesses.filter(b => b.verify?.status === "pending").length > 0 && (
                                <span className="ml-2 bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {businesses.filter(b => b.verify?.status === "pending").length}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6">
                        {loading && (
                            <div className="flex justify-center items-center py-16">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                            </div>
                        )}
                        
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">Error: {error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!loading && currentItems.length === 0 && (
                            <div className="text-center py-16">
                                <svg className="mx-auto h-16 w-16 text-amber-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No businesses found</h3>
                                <p className="mt-2 text-amber-600">
                                    {activeTab === "New Request" 
                                        ? "There are no new business verification requests waiting for review." 
                                        : "No approved businesses found in the system."}
                                </p>
                            </div>
                        )}

                        <div className="space-y-4">
                            {currentItems.map((business, index) => (
                                <BoxBusiness key={business._id || index} data={business} />
                            ))}
                        </div>
                    </div>

                    {/* Pagination */}
                    {filteredBusinesses.length > itemsPerPage && (
                        <div className="flex items-center justify-between px-6 py-4 bg-amber-50 border-t border-amber-100">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                                        currentPage === 1 
                                            ? "bg-amber-50 text-amber-300 border-amber-200 cursor-not-allowed" 
                                            : "bg-white text-amber-700 border-amber-300 hover:bg-amber-50"
                                    }`}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === Math.ceil(filteredBusinesses.length / itemsPerPage)}
                                    className={`ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                                        currentPage === Math.ceil(filteredBusinesses.length / itemsPerPage) 
                                            ? "bg-amber-50 text-amber-300 border-amber-200 cursor-not-allowed" 
                                            : "bg-white text-amber-700 border-amber-300 hover:bg-amber-50"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-amber-700">
                                        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                                        <span className="font-medium">
                                            {indexOfLastItem > filteredBusinesses.length ? filteredBusinesses.length : indexOfLastItem}
                                        </span>{" "}
                                        of <span className="font-medium">{filteredBusinesses.length}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <button
                                            onClick={prevPage}
                                            disabled={currentPage === 1}
                                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
                                                currentPage === 1 
                                                    ? "bg-amber-50 text-amber-300 border-amber-200 cursor-not-allowed" 
                                                    : "bg-white text-amber-600 border-amber-300 hover:bg-amber-50"
                                            }`}
                                        >
                                            <span className="sr-only">Previous</span>
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        
                                        {Array.from({ length: Math.min(5, Math.ceil(filteredBusinesses.length / itemsPerPage)) }).map((_, idx) => {
                                            const pageNumber = idx + 1;
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentPage(pageNumber)}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                        currentPage === pageNumber
                                                            ? "z-10 bg-amber-500 border-amber-500 text-white"
                                                            : "bg-white border-amber-300 text-amber-600 hover:bg-amber-50"
                                                    }`}
                                                >
                                                    {pageNumber}
                                                </button>
                                            );
                                        })}
                                        
                                        <button
                                            onClick={nextPage}
                                            disabled={currentPage === Math.ceil(filteredBusinesses.length / itemsPerPage)}
                                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
                                                currentPage === Math.ceil(filteredBusinesses.length / itemsPerPage) 
                                                    ? "bg-amber-50 text-amber-300 border-amber-200 cursor-not-allowed" 
                                                    : "bg-white text-amber-600 border-amber-300 hover:bg-amber-50"
                                            }`}
                                        >
                                            <span className="sr-only">Next</span>
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyBusiness;