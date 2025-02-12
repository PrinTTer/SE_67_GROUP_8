import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';


export const IconSideBar = ({ iconName, iconFont }) => {
  return (
    <div className=" flex items-center p-3 m-2 rounded-full hover:bg-gray-300 cursor-pointer">
      <FontAwesomeIcon icon={iconFont} className="mr-3 text-lg" />
      <span>{iconName}</span>
    </div>
  );
};


export const Category  =()=>{
    return (
      <div className=" p-10  rounded-lg  w-lvh h-lg self-center">
        
          <div className='grid grid-cols-2 grid-rows-2 gap-4'>
            <CategoryGrid link='/ListPage/hotel' image='https://cdn.pixabay.com/photo/2021/06/01/12/39/beach-6301597_1280.jpg' type='hotel' />
            <CategoryGrid link='/ListPage' image='https://cdn.pixabay.com/photo/2021/06/01/12/39/beach-6301597_1280.jpg' type='event'/>
            <CategoryGrid link='/ListPage' image='https://cdn.pixabay.com/photo/2021/06/01/12/39/beach-6301597_1280.jpg' type='car'/>
            <CategoryGrid link='/ListPage' image='https://cdn.pixabay.com/photo/2021/06/01/12/39/beach-6301597_1280.jpg' type='food'/>
          </div>
        
        
      </div>
    );
  };

export const CategoryGrid = ({link , image }) =>{
  
  return(   
            <div className='shadow-md '> 
              <Link to={link}>
                <img src={image}/>
              </Link>
            </div>
  );
} 
  
  
  
export const Section = ({title}) => {
    
    return (
      <div className="flex flex-col p-4 rounded-lg mb-4 shadow-md">
        <div className="flex flex-row">
          <h2 className="text-lg font-bold">{title}</h2>
          <h2 className="ml-auto text-blue-500 font-bold cursor-pointer">
            View All
          </h2>
        </div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    );
  };
  
export const Post =()=>{
    return(
      <Link to="/Detail">
          <div className="flex flex-row  shadow-md m p-4">
          
            <img
              className="w-1/3 h-auto  rounded-lg mr-5"
              src="https://cdn.pixabay.com/photo/2021/06/01/12/39/beach-6301597_1280.jpg"
            />
            <div className="w-1/2  ">
              <h1 className="text-xl font-bold"> Hotel</h1>
              <h2 > Bangkok</h2>
            </div>
            
          </div>
      </Link>
    );
  }
  
  