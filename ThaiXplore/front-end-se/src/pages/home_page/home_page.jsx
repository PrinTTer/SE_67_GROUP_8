import { Category, Section, RightBar } from './component/home_component';
import { NavBarWithText } from '../../layouts/navbar';
import { NavigateBar } from '../../layouts/navigatebar';
const HomePage = () => {
    return (
        <>
            <div className='flex flex-4 flex-col gap-5'>
                <Category />
                <Section title="Recommended" />
                <Section title="News" />
                <Section title="Package" />
            </div>
            <RightBar />
        </>
    );
}




export default HomePage;
