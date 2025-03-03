import { Link } from 'react-router-dom';
import {   getDataBusiness, getBusinessbyName, getBusinessbyProvince } from '../../../data';
import { useState, useEffect } from "react";
import { SearchBar } from '../../../components/SearchBar';
import { fetchData } from '../../../services/apiService';
import { PriceRange } from './RangeBar'
import  ProvinceDropdown  from './dropDownProvince'
import axios from "axios";



export const Category = () => {
  return (
    <div className=" p-10 rounded-lg self-center">
      <div className='grid grid-cols-4 gap-5'>
        <CategoryGrid link='/listpage/hotel' image='https://cdn.pixabay.com/photo/2021/06/01/12/39/beach-6301597_1280.jpg' title='Hotel' />
        <CategoryGrid link='/listpage/event' image='https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg' title='Event' />
        <CategoryGrid link='/listpage/restaurant' image='https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_1280.jpg' title='Food' />
        <CategoryGrid link='/listpage/carRental' image='https://cdn.pixabay.com/photo/2017/10/02/11/59/toys-2808599_1280.jpg' title='Car' />
      </div>
    </div>
  );
};


export const CategoryGrid = (prop) => {
  const { link, image, title } = prop
  return (
    <div>
      <Link to={link}>
        <figure className='flex justify-center items-center'>
          <img className='rounded-2xl' src={image} />
          <figcaption className='absolute text-3xl font-bold text-white drop-shadow-[2px_2px_2px_black] '>{title}</figcaption>
        </figure>
      </Link>
    </div>
  );
}



export const Section = (prop) => {
  let { title } = prop
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const types = ['hotel', 'event', 'restaurant','carRental','News','Recommended','Package'];
  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
      
  //     const res = await axios.get("http://localhost:3000/businesses", { withCredentials: true });
  //     const data_format = await res.data
  //     setData(data_format);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);


  // if (loading) return <p>Loading...</p>;
  // if (error) return <p className="text-red-500">Error: {error}</p>;
  // console.log(data)

  
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const result = await fetchData("businesses"); 
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []); 

  const [dataProvince, setDataProvince] = useState([]);

  const fetchProvince = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
      );
      setDataProvince(res.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  
  let post
  if(types.includes(title) ){
    post = getDataBusiness({ category: title, json: data });
    
  }
  else if(dataProvince.some(province => province.name_th === title) || dataProvince.some(province => province.name_en === title)){
    post = getBusinessbyProvince({ province: title, json: data });
  }
  else{
    post = getBusinessbyName({ businessName: title, json: data });
    title = `${post.length} Results Found`
  }


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col p-4 rounded-lg mb-4 shadow-md">
      <div className="flex flex-row">
        <h2 className="text-lg font-bold">{title}</h2>
        {/* <h2 className="ml-auto text-blue-500 font-bold cursor-pointer">View All</h2> */}
      </div>
      <div className='grid lg:mr-72 gap-4'>
        {post.map((element, index) => (

          <Post key={index} name={element.businessName} id={element._id} address={element.address} />
        ))}
      </div>
    </div>
  );
};

export const Post = (prop) => {
  const { name, id, address } = prop
  // const business = getBusiness(name)
  const link = `/Detail/${id}`;
  return (
    <Link to={link}>
      <div className="flex flex-col lg:flex-row shadow-md m p-4 bg-white">

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

export const RightBar = (prop) => {
  const { pagetitle } = prop


  return (
    <div className="hidden lg:flex flex-1 flex-col gap-4 py-4 items-center border-solid border-gray-300 border-l lg:sticky lg:top-0 h-screen">
      {/* <div className='flex-1'>
                <input type="text" className='bg-amber-300 rounded-4xl border-1 mt-4'/>
              </div> */}
      <SearchBar />

      <div className={`flex-8 ${pagetitle == "homepage" ? "hidden" : "block"}`} >
{/* 
         <div className='mb-5'>
          <div className='border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold'>Business</div>
          <form method='post'>
            <ChkBox title="Accommodation" group="Business" />
            <ChkBox title="Restaurant/Beverage" group="Business" />
            <ChkBox title="Event/Festival" group="Business" />
            <ChkBox title="Logistics" group="Business" />
          </form>
        </div>

        <div className='mb-5'>
          <div className='border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold'>News/Package</div>
          <form method='post'>
            <ChkBox title="News" group="Package" />
            <ChkBox title="Package" group="Package" />
          </form>
        </div>  */}

        <div className='mb-5'>
          <div className='border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold'>Recommend by ThaiXplore</div>
          <form method='post'>
            <ChkBox title="Recommended" group="Recommended" />
          </form>
        </div>
        
         <div className='mb-5'>
          <div className='border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold'>Province</div>
           <ProvinceDropdown /> 
        </div> 

        <div className='mb-5'>
          <div className='border-l-3 border-[#F96868] pl-1 text-[#007CE8] font-bold mb-3'>Price Range</div>
            
            <PriceRange />
        </div>

      </div>
      <div>

      </div>

    </div>
  );
}

const ChkBox = (prop) => {
  const { title, group } = prop
  return (
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






