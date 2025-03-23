import React from 'react';
import { RightBar } from '../home_page/component/home_component';
import PackageCard from './component/package_card';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PackagePage = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        // MOCK DATA: แก้เป็น fetch จริงถ้ามี API
        const mockData = [
            {
                id: 1,
                title: "นครนายก Team Up : ผจญภัย ฟื้นฟูธรรมชาติ",
                subtitle: "โพสต์เมื่อ 25 ก.พ. 2568",
                description: "กิจกรรม CSR และการประชุมเชิงอนุรักษ์ จ.นครนายก (3 วัน 2 คืน)",
                image: "https://i.pinimg.com/736x/a1/06/c7/a106c7e0256afac9d2e4295c42bf0163.jpg"
            },
            {
                id: 2,
                title: "Hua Hin Creation : ผ่อนคลาย สร้างสรรค์",
                subtitle: "โพสต์เมื่อ 24 ก.พ. 2568",
                description: "กิจกรรมสร้างทีมแบบ Treasured Team Building (3 วัน 2 คืน)",
                image: "https://i.pinimg.com/736x/a1/06/c7/a106c7e0256afac9d2e4295c42bf0163.jpg"
            },
            // เพิ่มรายการอื่นตามต้องการ
        ];

        setPackages(mockData);
    }, []);

    const link = `/detailpackage`;

    return (
        <div className="flex flex-5 w-full bg-gray-100 min-h-screen">
            {/* Content Area */}
            <div className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <span className="inline-block w-1 h-6 bg-amber-500 mr-3"></span>
                        Package
                    </h2>
                    <a href="#" className="text-blue-600 hover:underline">ดูทั้งหมด</a>
                </div>

                <Link to={link} className="inline-block text-white font-semibold py-2 px-4 rounded-full mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {packages.map((pkg) => (
                        <PackageCard key={pkg.id} data={pkg} />
                    ))}
                </div>
                </Link>
            </div>

            {/* Right Bar */}
            <RightBar pagetitle="package" />
        </div>
    );
};

export default PackagePage;
