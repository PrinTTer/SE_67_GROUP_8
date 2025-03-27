
import { RightBar, Section } from './component/home_component';
import { useParams } from 'react-router-dom';
import { useState } from "react";

function ListPage() {
  const { title } = useParams();
  const [filterRecommended, setFilterRecommended] = useState(false);

  return (
    <>
      <div className="flex flex-4 flex-col bg-gray-200">
      <Section title={filterRecommended ? "Recommended" : title} />

      </div>

      <RightBar
        pagetitle="listpage"
        filterRecommended={filterRecommended}
        setFilterRecommended={setFilterRecommended}
      />
    </>
  );
}



export default ListPage;