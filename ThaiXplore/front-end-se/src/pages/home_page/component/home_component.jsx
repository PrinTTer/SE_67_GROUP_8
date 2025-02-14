import { Link } from 'react-router-dom';
import { getData } from '../../../data';

export const Category  =()=>{
    return (
      <div className=" p-10  rounded-lg  w-lvh h-lg self-center">
        
          <div className='grid grid-cols-2 grid-rows-2 gap-4'>
            <CategoryGrid link='/ListPage/hotel' image='https://cdn.pixabay.com/photo/2021/06/01/12/39/beach-6301597_1280.jpg'  />
            <CategoryGrid link='/ListPage/event' image='https://cdn.pixabay.com/photo/2021/06/01/12/39/beach-6301597_1280.jpg'  />
            <CategoryGrid link='/ListPage/food' image='https://cdn.pixabay.com/photo/2021/06/01/12/39/beach-6301597_1280.jpg'   />
            <CategoryGrid link='/ListPage/car' image='https://cdn.pixabay.com/photo/2021/06/01/12/39/beach-6301597_1280.jpg'    />
          </div>
        
        
      </div>
    );
  };


export const CategoryGrid = (prop) =>{
  const {link , image } = prop
  return(   
            <div className='shadow-md '> 
              <Link to={link}>
                <img src={image}/>
              </Link>
            </div>
  );
} 
  
  
  
export const Section = (prop) => {
    const {title} = prop
    let post_list = getData( title ) ;
   
    return (
      <div className="flex flex-col p-4 rounded-lg mb-4 shadow-md">
        <div className="flex flex-row">
          <h2 className="text-lg font-bold">{title}</h2>
          <h2 className="ml-auto text-blue-500 font-bold cursor-pointer">
            View All
          </h2>
        </div>
        { post_list.map((element)=>{
          
          // eslint-disable-next-line react/jsx-key
          return <Post name={element.name} address={element.address}/>
          })
        }
      </div>
    );
  };
  
export const Post =(prop)=>{
  const {name , address} = prop
    const link  = "/Detail/"+name; 
    return(
      <Link to={link}>
          <div className="flex flex-row  shadow-md m p-4">
          
            <img
              className="w-1/3 h-auto  rounded-lg mr-5"
              src="https://cdn.pixabay.com/photo/2021/06/01/12/39/beach-6301597_1280.jpg"
            />
            <div className="w-1/2  ">
              <h1 className="text-xl font-bold"> {name}</h1>
              <h2 > {address}</h2>
            </div>
            
          </div>
      </Link>
    );
  }

  export const RightBar = () =>{
    return(
      <div className="flex flex-1 flex-col  items-center border-solid border-l-2 sticky top-0 h-screen">
              <input type="text" className='bg-amber-300 rounded-4xl border-1 mt-4'/>
              <div>
                 <p>Business</p>
                  <ChkBox />
                  <ChkBox />
                  <ChkBox />
              </div>
              <div>
                
              </div>
              <div>
                
              </div>
      </div>
    );
  }

   const ChkBox = (prop) =>{ 
    const {title} = prop
    return(
      <div className='items-center just'>
        <input type="radio" name="Business"  /> {title}
      </div>
    );
   }
  
  