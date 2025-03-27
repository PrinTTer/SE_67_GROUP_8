import React, { useState, useEffect } from "react";
import { fetchData } from "../../services/apiService";
import BoxBusiness from "./component/box_business";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const VerifyBusiness = () => {
    const [activeTab, setActiveTab] = useState("New Request");
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [search, setSearch] = useState("");

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

    useEffect(() => {
        getBusinesses();
    }, []);

    const filteredBusinesses = businesses.filter((business) => {
        const searchMatch = (
            business.businessName?.toLowerCase().includes(search.toLowerCase()) ||
            business.address?.toLowerCase().includes(search.toLowerCase()) ||
            business.description?.toLowerCase().includes(search.toLowerCase()) ||
            business.category?.toLowerCase().includes(search.toLowerCase())
        );

        if (activeTab === "New Request") {
            return business.verify?.status === "pending" && searchMatch;
        } else {
            return business.verify?.status === "approved" && searchMatch;
        }
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBusinesses.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="flex flex-5 flex-col bg-white min-h-screen">
            <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white py-6 px-8 shadow-md">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold">Business Management</h2>
                </div>
            </div>

            <div className="max-w-6xl mx-auto w-full px-8 py-6">
                <div className="flex border-b border-amber-200 mb-6">
                    {["New Request", "All business"].map((tab) => (
                        <div
                            key={tab}
                            className={`px-6 py-3 font-medium cursor-pointer transition-all duration-200 -mb-px ${
                                activeTab === tab
                                    ? "border-b-2 border-amber-600 text-amber-800 font-semibold"
                                    : "text-gray-600 hover:text-amber-700 hover:border-amber-200"
                            }`}
                            onClick={() => {
                                setActiveTab(tab);
                                setCurrentPage(1);
                            }}
                        >
                            {tab}
                            {tab === "New Request" &&
                                businesses.filter((b) => b.verify?.status === "pending").length > 0 && (
                                    <span className="ml-2 bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        {businesses.filter((b) => b.verify?.status === "pending").length}
                                    </span>
                                )}
                        </div>
                    ))}
                </div>

                <div className="w-full flex justify-end mb-4">
                <div className="w-full max-w-md flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search business name, address or description"
                        className="bg-transparent outline-none w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6">
                        {loading && (
                            <div className="flex justify-center items-center py-16">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                                <p className="text-sm text-red-700">Error: {error}</p>
                            </div>
                        )}

                        {!loading && currentItems.length === 0 && (
                            <div className="text-center py-16">
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
                                <BoxBusiness key={business._id || index} data={business} setData={getBusinesses} />
                            ))}
                        </div>
                    </div>

                    {filteredBusinesses.length > itemsPerPage && (
                        <div className="flex justify-between items-center px-6 py-4 border-t border-amber-100 bg-amber-50">
                            <div className="text-sm text-amber-700">
                                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredBusinesses.length)} of {filteredBusinesses.length} results
                            </div>

                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded ${
                                        currentPage === 1
                                            ? "bg-amber-200 text-white cursor-not-allowed"
                                            : "bg-amber-500 text-white hover:bg-amber-600"
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> Previous
                                </button>
                                <span className="text-amber-800 font-medium">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded ${
                                        currentPage === totalPages
                                            ? "bg-amber-200 text-white cursor-not-allowed"
                                            : "bg-amber-500 text-white hover:bg-amber-600"
                                    }`}
                                >
                                    Next <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyBusiness;