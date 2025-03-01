import { Link, useNavigate } from 'react-router-dom';
import { getDataBusiness } from '../../../data';
import axios from 'axios';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const Category  =()=>{
    return (
      <div className=" p-10  rounded-lg  w-lvh h-lg self-center">
        
          <div className='grid grid-cols-2 grid-rows-2 gap-4'>
            <CategoryGrid link='/ListPage/hotel' image='https://cdn.pixabay.com/photo/2021/06/01/12/39/beach-6301597_1280.jpg' title='Hotel' />
            <CategoryGrid link='/ListPage/event' image='https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg' title='Event' />
            <CategoryGrid link='/ListPage/restaurant' image='https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_1280.jpg'  title='Food' />
            <CategoryGrid link='/ListPage/carRental' image='https://cdn.pixabay.com/photo/2017/10/02/11/59/toys-2808599_1280.jpg'   title='Car' />
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
  
  
  
export const Section = ({ title }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
      try {
          setLoading(true);
          
          
          
          const res = await axios.get("http://localhost:3000/businesses",{withCredentials : true});
          const data_format = await res.data
          setData(data_format);
      } catch (error) {
          setError(error.message);
      } finally {
          setLoading(false);
      }
  };

      useEffect(() => {
        fetchData();
    }, []);


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
    console.log(data)
  let post
  
      post = getDataBusiness({ category: title, json: data }); 
  
  
   
  
  
  return (
      <div className="flex flex-col p-4 rounded-lg mb-4 shadow-md">
          <div className="flex flex-row">
              <h2 className="text-lg font-bold">{title}</h2>
              <h2 className="ml-auto text-blue-500 font-bold cursor-pointer">View All</h2>
          </div>
          {post.map((element , index) => (
              
              <Post key={index} name={element.businessName} id={element._id} address={element.address} />
          ))}
      </div>
  );
};
  
export const Post =(prop)=>{
  const {name , id, address} = prop
    alert(name)
    const link  = `/Detail/${id}`; 
    return(
      <Link to={link}>
          <div className="flex flex-row  shadow-md m p-4">
          
          <img
            className="w-80 h-50 rounded-lg mr-5 object-cover"
            src="https://i.pinimg.com/736x/a1/06/c7/a106c7e0256afac9d2e4295c42bf0163.jpg"
            alt="Business"
          />

            <div className="w-1/2  ">
              <h1 className="text-xl font-bold"> {name}</h1>
              <h2 > {address}</h2>
              
            </div>
            
          </div>
      </Link>
    );
  }

  export const RightBar = ( prop ) =>{
    const types = ['hotel', 'event', 'restaurant','carRental'];
    const { setSelectedCategory } = prop;
    const [find , setFind] = useState("");
    const navigate = useNavigate();
    // setSelectedCategory("All");
    const handleChange = (event) => {
      setFind(event.target.value); 
      
    };

    const changePage = () => {
      setSelectedCategory("");
      if(types.includes(find)){
        navigate(`/ListPage/${find}`)
      }
      else{
        navigate(`/ListPage/${find}`)
      }
      
    };

    return(
      <div className="flex flex-1 flex-col  items-center border-solid border-l-2 sticky top-0 h-screen">
              <div className="flex flex-1 justify-center items-center m-3">
                  <div className="flex items-center bg-white p-2 rounded-full shadow-md ">
                      <input 
                          type="text" 
                          className="bg-amber-200 rounded-full border border-gray-400 px-4 py-2 "
                          placeholder="Search..."
                          onChange={handleChange}
                          onKeyDown={(e) => e.key === "Enter" && changePage()} 
                      />
                      <FontAwesomeIcon 
                          icon={faMagnifyingGlass}  
                          className="cursor-pointer hover:bg-gray-300 p-2 hover:rounded-full ml-2"
                          onClick={changePage}
                      />
                  </div>
              </div>


              <div className='flex-8'>

                  <div className='mb-5'>
                    <div className='border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold'>Business</div>
                      
                      <ChkBox title="All"         group="Business"  setSelectedCategory={setSelectedCategory}/>
                      <ChkBox title="hotel"       group="Business"  setSelectedCategory={setSelectedCategory}/>
                      <ChkBox title="restaurant"  group="Business"  setSelectedCategory={setSelectedCategory}/>
                      <ChkBox title="event"       group="Business"  setSelectedCategory={setSelectedCategory}/>
                      <ChkBox title="carRental"   group="Business"  setSelectedCategory={setSelectedCategory}/>
                    
                    
                  </div>
              
                  <div className='mb-5'>
                    <div className='border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold'>Package</div>
                    <ChkBox title="Package"   group="Business" setSelectedCategory={setSelectedCategory}/>
                    <ChkBox title="News"   group="Business" setSelectedCategory={setSelectedCategory}/>
                  </div>
                  
                  <div className='mb-5'>
                    <div className='border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold'>Recommend by ThaiXplore</div>
                    <ChkBox title="Recommended" group="Business" setSelectedCategory={setSelectedCategory}/> 
                  </div>
                  
                 

              </div>
                
             
      </div>
    );
  }

   const ChkBox = (prop) =>{ 
    const {title , group , setSelectedCategory} = prop
    
    return(
      <label className="flex items-center gap-2">
        <input
            type="radio"
            name={group}
            onClick={() => setSelectedCategory(title)}
            className="w-3 h-3 appearance-none rounded-[35%] border border-gray-500 checked:bg-blue-500"
        />
          <span>{title}</span>
      </label>

    );
   }


   
   


  
  