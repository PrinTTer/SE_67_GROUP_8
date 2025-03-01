import { Category , Section , RightBar} from './component/home_component' ;
import {NavBarWithText} from '../../component/navbar';
import { useState } from 'react';


const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All"); // Default section
    const types = ['hotel', 'event', 'restaurant','carRental','News','Recommended','Package'];


    return (
<div className = "flex flex-1 flex-col-reverse  lg:flex-row">
      
          <NavBarWithText />

                
                <div className='flex flex-4 flex-col'>
                    <Category />
                    {types.includes(selectedCategory) ? (
                    <>
                        <Section title={selectedCategory} />
                    </>
                ) : (   <>
                        <Section title="hotel" />
                        <Section title="restaurant" />
                        <Section title="event" />
                        <Section title="carRental" />
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



  
export default HomePage;
