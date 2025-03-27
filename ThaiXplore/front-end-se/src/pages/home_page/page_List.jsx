import { RightBar, Section } from './component/home_component';
import { useParams } from 'react-router-dom';
import { useState } from "react";

function ListPage() {
  const { title } = useParams();
  const [filterRecommended, setFilterRecommended] = useState(false);

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
        pagetitle="listpage"
        filterRecommended={filterRecommended}
        setFilterRecommended={setFilterRecommended}
      />
    </div>
  );
}

export default ListPage;
