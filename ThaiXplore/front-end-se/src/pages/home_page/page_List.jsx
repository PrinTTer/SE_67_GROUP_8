import { RightBar, Section } from './component/home_component';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

function ListPage() {
  const { title } = useParams();
  const [filterRecommended, setFilterRecommended] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");

  useEffect(() => {
    console.log("Selected Province updated:", title);
    setSelectedProvince("")
  }, [title]);  // ใช้ useEffect เพื่อดูการอัพเดทค่าของ selectedProvince

  return (
    <div className="flex flex-5 w-full bg-gray-50 min-h-screen">
      {/* LEFT SIDE */}
      <div className="flex-1 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          <Section title={filterRecommended ? "Recommended" : title} />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <RightBar
        pagetitle={title}
        filterRecommended={filterRecommended}
        setFilterRecommended={setFilterRecommended}
        setSelectedProvince={setSelectedProvince}
      />
    </div>
  );
}

export default ListPage;
