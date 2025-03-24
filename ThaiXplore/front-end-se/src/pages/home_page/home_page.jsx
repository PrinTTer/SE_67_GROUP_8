import { Category, Section, RightBar } from './component/home_component';
const HomePage = () => {

    // const types = ['hotel', 'event', 'restaurant','carRental','News','Recommended','Package'];


    return (
        <>
            <div className='flex flex-4 flex-col gap-5'>
                <Category />
                <Section title="Recommended" viewType="card" />
<Section title="hotel" viewType="card" />
<Section title="event" viewType="card" />
<Section title="restaurant" viewType="card" />
<Section title="carRental" viewType="card" />

                <Section title="Package" viewType="card" />
            </div>
            <RightBar pagetitle="homepage"/>
        </>
    );
}




export default HomePage;
