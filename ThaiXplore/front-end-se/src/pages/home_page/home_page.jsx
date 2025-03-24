import ImageSlider from '../../components/ImageSlider';
import { Category, Section, RightBar } from './component/home_component';
const HomePage = () => {

    return (
        <>
            <div className='flex flex-4 flex-col gap-5'>
                <div className="grid h-96 p-5">
                        <ImageSlider />
                </div>
                <Category />
                <Section title="Recommended" />
                <Section title="Package" />
            </div>
            <RightBar pagetitle="homepage"/>
        </>
    );
}




export default HomePage;
