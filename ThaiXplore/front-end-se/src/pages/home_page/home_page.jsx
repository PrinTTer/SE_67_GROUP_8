import { Category, Section, RightBar } from './component/home_component';
const HomePage = () => {

    // const types = ['hotel', 'event', 'restaurant','carRental','News','Recommended','Package'];


    return (
        <>
            <div className='flex flex-4 flex-col gap-5'>
                <Category />
                <Section title="Recommended" />
                <Section title="hotel"/>
                <Section title="event"/>
                <Section title="restaurant"/>
                <Section title="carRental"/>
                <Section title="Package" />
            </div>
            <RightBar pagetitle="homepage"/>
        </>
    );
}




export default HomePage;
