import { useState } from 'react';
import ImageSlider from '../../components/ImageSlider';
import { Category, Section, RightBar } from './component/home_component';
const HomePage = () => {
    const [filterRecommended, setFilterRecommended] = useState(false);

    return (
      <div className="flex">
        <div className="flex-1 flex flex-col gap-5">
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
    
        <RightBar
          pagetitle="homepage"
          filterRecommended={filterRecommended}
          setFilterRecommended={setFilterRecommended}
        />
      </div>
    );
    
}




export default HomePage;