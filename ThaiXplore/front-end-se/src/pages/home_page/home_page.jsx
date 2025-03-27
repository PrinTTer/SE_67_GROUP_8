import { useState } from 'react';
import ImageSlider from '../../components/ImageSlider';
import { Category, Section, RightBar } from './component/home_component';
const HomePage = () => {
    const [filterRecommended, setFilterRecommended] = useState(false);

    return (
      <div className="flex flex-5 w-full bg-gray-50 min-h-screen">
        <div className="flex-1 p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {filterRecommended ? (
            <Section title="Recommended" viewType="list" />
          ) : (
            <>
              <div className="grid h-[45vh] p-3">
                <ImageSlider />
              </div>
              <Category />
              <Section title="Recommended" viewType="card" />
              <Section title="hotel" viewType="card" />
              <Section title="event" viewType="card" />
              <Section title="restaurant" viewType="card" />
              <Section title="carRental" viewType="card" />
              <Section title="Package" viewType="card" />
            </>
          )}
          </div>
        </div>
    
        <RightBar
          pagetitle="homepage"
          filterRecommended={filterRecommended}
          setFilterRecommended={setFilterRecommended}
        />
      </div>
    );
    
}




export default HomePage;