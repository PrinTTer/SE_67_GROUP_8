import React, { useEffect, useState, useMemo } from "react";
import { RightBar } from "../home_page/component/home_component";
import PackageCard from "./component/package_card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faFilter,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { fetchData } from "../../services/apiService";
import { mockPackages } from "./mock";

const getPackageImageUrl = (filename) => {
  return `http://localhost:3000/public/uploads/services/packages/${filename}`;
};

const PackagePage = () => {
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("latest");
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    const loadPackages = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData("/packages");

        const formatted = response.map((pkg) => ({
          id: pkg._id,
          title: pkg.title,
          subtitle: `เริ่ม ${new Date(pkg.startDate).toLocaleDateString("th-TH")} - ${new Date(pkg.endDate).toLocaleDateString("th-TH")}`,
          description: pkg.description,
          image: pkg.media.length > 0 ? getPackageImageUrl(pkg.media[0]) : "https://placehold.co/600x400?text=No+Image",
          price: pkg.price || 0,
          dateCreate: pkg.dateCreate || new Date().toISOString(),
        }));

        setPackages(formatted);
      } catch (err) {
        console.error("Error loading packages", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPackages();
  }, []);

  const sortedPackages = useMemo(() => {
    const sorted = [...packages];
    switch (sortOption) {
      case "priceLow":
        return sorted.sort((a, b) => a.price - b.price);
      case "priceHigh":
        return sorted.sort((a, b) => b.price - a.price);
      case "latest":
        return sorted.sort((a, b) => new Date(b.dateCreate) - new Date(a.dateCreate));
      case "popular":
        return sorted;
      default:
        return sorted;
    }
  }, [packages, sortOption]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedPackages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedPackages.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-5 w-full bg-gray-50 min-h-screen">
      <div className="flex-1 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden h-96 animate-pulse"
                >
                  <div className="w-full h-64 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">แสดง {packages.length} แพคเกจ</p>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-amber-400 bg-white"
                >
                  <option value="latest">เรียงตามล่าสุด</option>
                  <option value="popular">เรียงตามยอดนิยม</option>
                  <option value="priceLow">เรียงตามราคา: ต่ำไปสูง</option>
                  <option value="priceHigh">เรียงตามราคา: สูงไปต่ำ</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentItems.length > 0 ? (
                  currentItems.map((pkg) => (
                    <Link
                      key={pkg.id}
                      to={`/detailpackage/${pkg.id}`}
                      className="focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl"
                    >
                      <PackageCard data={pkg} />
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <p className="text-gray-500 text-lg">ไม่พบแพคเกจที่ค้นหา</p>
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 mb-6">
                  <div className="inline-flex shadow-sm rounded-lg overflow-hidden">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`flex items-center px-5 py-3 border ${
                        currentPage === 1
                          ? "bg-gray-50 text-gray-300 cursor-not-allowed border-gray-200"
                          : "bg-white text-amber-600 hover:bg-amber-50 border-amber-200"
                      }`}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
                      <span>หน้าก่อนหน้า</span>
                    </button>

                    <div className="flex items-center justify-center px-5 py-3 bg-amber-500 text-white font-medium border-l border-r border-amber-300">
                      {currentPage} / {totalPages}
                    </div>

                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className={`flex items-center px-5 py-3 border ${
                        currentPage === totalPages
                          ? "bg-gray-50 text-gray-300 cursor-not-allowed border-gray-200"
                          : "bg-white text-amber-600 hover:bg-amber-50 border-amber-200"
                      }`}
                    >
                      <span>หน้าถัดไป</span>
                      <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <RightBar pagetitle="package" />
    </div>
  );
};

export default PackagePage;
