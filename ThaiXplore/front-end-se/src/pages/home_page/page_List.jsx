
import { RightBar, Section } from './component/home_component';

import { useParams } from 'react-router-dom';


function ListPage() {
  let { title } = useParams();

  return (
    <>
      <div className='flex flex-4 flex-col bg-gray-200'>
        <Section title={title} />
      </div>

      {/* <div className="flex flex-1 flex-col  items-center border-solid border-l-2 sticky top-0 h-screen">
        <input type="text" className='bg-amber-50 rounded-4xl border-1 mt-4' />
      </div> */}
      <RightBar  pagetitle={title}/>
    </>
  )
}


export default ListPage;