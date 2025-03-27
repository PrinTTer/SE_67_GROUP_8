import { RightBar, Section } from './component/home_component';
import { useParams } from 'react-router-dom';
import { useState } from "react";

function ListPage() {
  const { title } = useParams();
  const [filterRecommended, setFilterRecommended] = useState(false);

  return (
    <div className="flex flex-5 w-full bg-gray-50 min-h-screen">
      <div className="flex-1 p-6 lg:p-10">
        <Section title={filterRecommended ? "Recommended" : title} />
      </div>

      <RightBar
        pagetitle="listpage"
        filterRecommended={filterRecommended}
        setFilterRecommended={setFilterRecommended}
      />
    </div>
  );
}

export default ListPage;
