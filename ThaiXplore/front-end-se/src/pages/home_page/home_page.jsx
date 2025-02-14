import { Category , Section} from './component/home_component' ;
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

                <div className="flex flex-1 flex-col  items-center border-solid border-l-2 sticky top-0 h-screen">
                    <input type="text" className='bg-amber-50 rounded-4xl border-1 mt-4'/>
                </div>
      
    </div>
      
    );
}



  
export default HomePage;