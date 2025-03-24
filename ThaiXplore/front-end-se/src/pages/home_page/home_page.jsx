import ImageSlider from '../../components/ImageSlider';
import { Category, Section, RightBar } from './component/home_component';
const HomePage = () => {

    return (
        <>
            <div className='flex flex-4 flex-col gap-5'>
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
            </div>
            <RightBar pagetitle="homepage"/>
        </>
    );
}




export default HomePage;
