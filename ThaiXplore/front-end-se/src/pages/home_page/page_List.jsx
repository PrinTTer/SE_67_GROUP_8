
import {  Section ,RightBar} from './component/home_component' ;
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {NavBarWithText} from '../../component/navbar';

function ListPage() {
  let { title } = useParams();
  const [selected, setSelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // Default section
  const types = ['hotel', 'event', 'restaurant','carRental','Package','News','Recommended'];
  console.log(selectedCategory)
  
  return (
    <div className="flex flex-1 flex-row overflow-auto scrollbar-hide">
        <NavBarWithText />

        <div className="flex flex-4 flex-col">
            {types.includes(title) && selectedCategory=="" ? (
                <Section title={title} />
                
            ) : types.includes(selectedCategory) ? (
                <Section title={selectedCategory} />
            ) : (
                <>
                    <Section title="Recommended" />
                    <Section title="News" />
                    <Section title="Package" />
                </>
            )}
        </div>

        <RightBar setSelectedCategory={setSelectedCategory} />
    </div>
);

}


export default ListPage;
