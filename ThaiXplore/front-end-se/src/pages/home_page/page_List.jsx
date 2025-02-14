
import {  Section} from './component/home_component' ;

import { useParams } from 'react-router-dom';
import {NavBarWithText} from '../../component/navbar';



function ListPage() {
  
  let { title } = useParams();
  return (
    <div className = "flex flex-1 flex-row">
      
      <NavBarWithText />

     
      <div className='flex flex-4 flex-col'>
          
          <Section title={title}/>
          
          
      </div>

      <div className="flex flex-1 flex-col  items-center border-solid border-l-2 sticky top-0 h-screen">
        <input type="text" className='bg-amber-50 rounded-4xl border-1 mt-4'/>
      </div>
      
    </div>
  )
}


export default ListPage;
