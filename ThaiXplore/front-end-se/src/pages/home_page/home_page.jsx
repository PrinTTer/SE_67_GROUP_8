import { Category , Section , RightBar} from './component/home_component' ;
 import {NavBarWithText} from '../../component/navbar';
const HomePage = () => {
    return (
        <div className = "flex flex-1 flex-row ">
      
          <NavBarWithText />

                
                <div className='flex flex-4 flex-col'>
                    <Category />
                    <Section title= "Recommended"/>
                    <Section title= "News"/>
                    <Section title= "Package"/>
                </div>

                <RightBar />
      
    </div>
      
    );
}



  
export default HomePage;