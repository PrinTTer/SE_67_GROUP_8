import React, { useEffect, useState } from 'react';
import { RightBar } from '../home_page/component/home_component';
import PackageCard from './component/package_card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // ⬅️ อย่าลืม import


const PackagePage = () => {
    const [packages, setPackages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        const mockData = Array.from({ length: 55 }, (_, index) => ({
            id: index + 1,
            title: `แพคเกจที่ ${index + 1}`,
            subtitle: `โพสต์เมื่อ ${24 + (index % 5)} ก.พ. 2568`,
            description: `รายละเอียดแพคเกจตัวอย่าง (${index + 1})`,
            image: "https://i.pinimg.com/736x/a1/06/c7/a106c7e0256afac9d2e4295c42bf0163.jpg"
        }));
        setPackages(mockData);
    }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = packages.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(packages.length / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="flex flex-5 w-full bg-gray-100 min-h-screen">
            {/* Content Area */}
            <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
                    <span className="inline-block w-1 h-6 bg-amber-500 mr-3"></span>
                    Package
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

                    {currentItems.map((pkg) => (
                        <Link key={pkg.id} to={`/detailpackage/${pkg.id}`}>
                            <PackageCard data={pkg} />
                        </Link>
                    ))}

                </div>

                {/* Pagination Buttons */}
                <div className="flex justify-center items-center mt-8 space-x-4">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} /> Prev Page
                    </button>
                    <span className="px-4 py-2 text-gray-700">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"}`}
                    >
                        Next Page <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>

            {/* Right Bar */}
            <RightBar pagetitle="package" />
        </div>
    );
};

export default PackagePage;
