import { Link } from 'react-router-dom';
import { getBusiness, getData } from '../../../data';

export const Category  =()=>{
    return (
      <div className=" p-10  rounded-lg  w-lvh h-lg self-center">
        
          <div className='grid grid-cols-2 grid-rows-2 gap-4'>
            <CategoryGrid link='/ListPage/Hotel' image='https://cdn.pixabay.com/photo/2021/06/01/12/39/beach-6301597_1280.jpg' title='Hotel' />
            <CategoryGrid link='/ListPage/Event' image='https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg' title='Event' />
            <CategoryGrid link='/ListPage/Food' image='https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_1280.jpg'  title='Food' />
            <CategoryGrid link='/ListPage/Car' image='https://cdn.pixabay.com/photo/2017/10/02/11/59/toys-2808599_1280.jpg'   title='Car' />
          </div>
        
        
      </div>
    );
  };


export const CategoryGrid = (prop) =>{
  const {link , image ,title } = prop
  return(   
            <div className='shadow-md '> 
              <Link to={link}>
              <figure className='flex justify-center items-center'>
                 <img src={image}/>
                <figcaption className='absolute text-3xl font-bold text-white drop-shadow-[2px_2px_2px_black] '>{title}</figcaption>
              </figure>
               
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
  const business = getBusiness(name)
    const link  = "/Detail/"+name; 
    return(
      <Link to={link}>
          <div className="flex flex-row  shadow-md m p-4">
          
            <img
              className="w-80 h-80  rounded-lg mr-5"
              src={business.image.main}
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
              <div className='flex-1'>
                <input type="text" className='bg-amber-300 rounded-4xl border-1 mt-4'/>
              </div>

              <div className='flex-8'>

                  <div className='mb-5'>
                  <div className='border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold'>Business</div>
                    <ChkBox title="Accommodation"       group="Business"/>
                    <ChkBox title="Restaurant/Beverage" group="Business"/>
                    <ChkBox title="Event/Festival"      group="Business"/>
                    <ChkBox title="Logistics"           group="Business"/>
                  </div>

                  <div className='mb-5'>
                    <div className='border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold'>News/Package</div>
                    <ChkBox title="News"      group="Package"/>
                    <ChkBox title="Package"   group="Package"/>
                  </div>
                  
                  <div className='mb-5'>
                    <div className='border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold'>Recommend by ThaiXplore</div>
                    <ChkBox title="Recommended" group="Recommended"/>
                  </div>
                  
                  <div className='mb-5'>
                    <div className='border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold'>Price Range</div>
                   
                  </div>

              </div>
      <div>
                
              </div>
             
      </div>
    );
  }

   const ChkBox = (prop) =>{ 
    const {title , group} = prop
    return(
      <label className="flex items-center gap-2">
        <input
            type="radio"
            name={group}
            className="w-3 h-3 appearance-none rounded-[35%] border border-gray-500 checked:bg-blue-500"
        />
          <span>{title}</span>
      </label>

    );
   }

   
   


  
  