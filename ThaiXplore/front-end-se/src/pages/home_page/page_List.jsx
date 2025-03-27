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
    <>
      <div className="flex flex-4 flex-col bg-gray-200">
        <Section 
          title={filterRecommended ? "Recommended" : title} 
          selectedProvince={selectedProvince} 
          setSelectedProvince={setSelectedProvince} 
        />
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

