import { Link } from 'react-router-dom';
import { getDataBusiness, getBusinessbyName, getBusinessbyProvince } from '../../../data';
import { useState, useEffect, use } from "react";
import { SearchBar } from '../../../components/SearchBar';
import { fetchData } from '../../../services/apiService';
import ProvinceDropdown from './dropDownProvince';
import axios from "axios";
import LoadingSpinner from '../../../components/LoadingSpinner';
import { PostCardPackage } from './postPackage';
import PictureShow from '../../businessmanage_page/component/picture_show';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheck, faTimes, faLocationDot, faImage } from '@fortawesome/free-solid-svg-icons';




export const Category = () => {
  return (
    <div className="py-12 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        <span className="inline-block border-b-2 border-amber-500 pb-2">Explore Thailand</span>
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto'>
        <CategoryGrid
          link='/listpage/hotel'
          image='https://cdn.pixabay.com/photo/2021/06/01/12/39/beach-6301597_1280.jpg'
          title='Hotels & Resorts'
        />
        <CategoryGrid
          link='/listpage/event'
          image='https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg'
          title='Events & Festivals'
        />
        <CategoryGrid
          link='/listpage/restaurant'
          image='https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_1280.jpg'
          title='Restaurant'
        />
        <CategoryGrid
          link='/listpage/carRental'
          image='https://cdn.pixabay.com/photo/2017/10/02/11/59/toys-2808599_1280.jpg'
          title='Car Rental'
        />
      </div>
    </div>
  );
};

export const CategoryGrid = (prop) => {
  const { link, image, title } = prop;
  return (
    <Link to={link} className="group overflow-hidden">
      <div className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-500 transform group-hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
        <img
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          src={image}
          alt={title}
        />
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
          <h3 className="text-2xl font-semibold text-white group-hover:text-amber-300 transition-colors duration-300">{title}</h3>
          <div className="w-10 h-0.5 bg-amber-500 mt-2 transition-all duration-300 group-hover:w-16"></div>
        </div>
      </div>
    </Link>
  );
}

export const Section = (prop) => {
  let { title, viewType = "list" ,selectedProvince ,setSelectedProvince} = prop;
  let isPackage = title === "Package";
  const [data, setData] = useState([]);
  const [pack, setPackage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const types = ['hotel', 'event', 'restaurant', 'carRental', 'News', 'Recommended', 'Package'];



  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const result = await fetchData("businesses");
        const verified = result.filter(item => item.verify?.status === "approved");
        setData(verified);
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getPackage = async () => {
      setLoading(true);
      try {
        const result = await fetchData("packages");
        const result2 = result.filter((item)=>(item.totalPackage-item.packageTransactionHistory.length)>0);
        setPackage(result2);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPackage();

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
    console.log(title)
  }, []);

  

  let post;
  if (isPackage) {
    post = pack;
  } else if (types.includes(title)) {
    post = getDataBusiness({ category: title, json: data });
    if(selectedProvince){
      
      post = post.filter(item => 
      item.address.includes(selectedProvince)
    );
    
    }
    
  } else {
    post = getBusinessbyName({ businessName: title, json: data });
    title = `${post.length} Results Found for "${title}"`;
  }


  if (loading) {
    return (
      <div className="min-h-[300px] p-6 bg-white rounded-xl shadow-md flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <p className="text-red-500 font-medium">Error: {error}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center capitalize">
          <span className="inline-block w-1 h-6 bg-amber-500 mr-3 "></span>
          {title === "carRental" ? "car rental" : title === "hotel" ? "hotels & resorts" : title === "event" ? "activities & events" : title}
        </h2>
        {viewType === "card" && (
          <Link
            to={title === "Package" ? "/package" : `/listpage/${title}`}
            className="text-sm text-amber-500 hover:underline"
          >
            see more
          </Link>
        )}
      </div>
      <div className="p-6">
        {/* <div className="grid gap-6"> */}
        <div className={`grid ${viewType === "card" ? isPackage ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" : "gap-6"}`}>

          {post.length > 0 ? (
            (viewType === "card" ? post.slice(0, 4) : post).map((element, index) => (
              isPackage ? (
                <PostCardPackage
                  key={index}
                  id={element._id}
                  name={element.title}
                  description={element.description}
                  date={element.dateCreate}
                  media={element.media}
                />
              ) : viewType === "card" ? (
                <PostCard
                  key={index}
                  name={element.businessName}
                  id={element._id}
                  address={element.address}
                  category={element.category}
                  media={element.media}
                  description={element.description}
                />
              ) : (
                <PostList
                  key={index}
                  name={element.businessName}
                  id={element._id}
                  address={element.address}
                  category={element.category}
                  media={element.media}
                  description={element.description}
                />
              )
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const PostCard = (prop) => {
  const { name, id, address, category, media, description } = prop;


  const link = `/Detail/${id}`;
  return (
    <>
      <Link to={link} className="bg-white shadow rounded-xl p-4 hover:shadow-md transition-all">
        <div className="w-full aspect-[3/2] bg-gray-100 flex items-center justify-center relative overflow-hidden rounded-lg mb-2">
          {media.length > 0 ? (

            <div className="w-full h-full overflow-hidden rounded-l-lg">
              <img
                src={`http://localhost:3000/public/uploads/businesses/images/${media[0]}`}
                alt="main-img"
                className="w-full h-full object-cover"

              />
            </div>



          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full">
              <FontAwesomeIcon icon={faImage} className="text-4xl mb-2" />
              <span className="text-sm">No picture</span>
            </div>
          )}

          {/* {category && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {category}
                      </span>
                    </div>
                  )} */}
        </div>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800 hover:text-amber-600 transition-colors">{name}</h3>
          <span className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded-full uppercase tracking-wider">{category}</span>
        </div>
        <div className="flex gap-2 text-gray-600">
          <div>
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
          <div className="flex text-gray-600 line-clamp-1">
            {address}
          </div>
        </div>
        <div className="mt-3 text-gray-600 line-clamp-3">
          {description}
        </div>
        {/* <div className="flex items-center text-amber-500">
        <span className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg>
          ))}
        </span>
        <span className="text-xs text-gray-500 ml-2">(120 reviews)</span>
      </div> */}
      </Link>


      {/* {showGallery && (
    <PictureShow
      images={media}
      onClose={() => setShowGallery(false)}
    />
  )} */}

    </>
  );
};


export const PostList = (prop) => {
  const { name, id, address, category, media, description } = prop;
  const link = `/Detail/${id}`;

  return (
    <Link to={link} className="block transition-all duration-300 hover:shadow-lg">
      <div className="bg-white grid lg:grid-cols-[20%_70%_10%] w-full min-h-[200px] drop-shadow-xl rounded-xl ">
      <div className="w-full md:w-56 h-full aspect-[3/2] bg-gray-100 flex items-center justify-center relative overflow-hidden">
  {/* ✅ No Image */}
  {(!media || media.length === 0) && (
    <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full">
      <FontAwesomeIcon icon={faImage} className="text-4xl mb-2" />
      <span className="text-sm">No picture</span>
    </div>
  )}

  {/* ✅ 1 Image */}
  {media?.length === 1 && (
    <div className="w-full h-full overflow-hidden rounded-lg">
      <img
        src={`http://localhost:3000/public/uploads/businesses/images/${media[0]}`}
        alt="main-img"
        className="w-full h-full object-cover"
      />
    </div>
  )}

  {/* ✅ 2 Images */}
  {media?.length === 2 && (
    <div className="grid grid-cols-2 w-full h-full gap-1">
      {media.slice(0, 2).map((img, idx) => (
        <div key={idx} className="h-full w-full overflow-hidden rounded">
          <img
            src={`http://localhost:3000/public/uploads/businesses/images/${img}`}
            alt={`img-${idx}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )}

  {/* ✅ 3 or more Images */}
  {media?.length >= 3 && (
    <div className="flex h-full w-full">
      {/* รูปซ้ายใหญ่ */}
      <div className="w-2/3 h-full overflow-hidden rounded-l-lg">
        <img
          src={`http://localhost:3000/public/uploads/businesses/images/${media[0]}`}
          alt="main-img"
          className="w-full h-full object-cover"
        />
      </div>

      {/* รูปขวา 2 ช่องซ้อน */}
      <div className="w-1/3 h-full flex flex-col gap-1 pl-1">
        {media.slice(1, 3).map((img, idx) => (
          <div key={idx} className="relative h-1/2 w-full overflow-hidden rounded">
            <img
              src={`http://localhost:3000/public/uploads/businesses/images/${img}`}
              alt={`side-img-${idx}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay ถ้ามีรูปเหลือ */}
            {idx === 1 && media.length > 3 && (
              <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center text-white font-semibold text-xl rounded">
                +{media.length - 3}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )}
</div>



        {/* <div className="p-6 lg:w-2/3"> */}
        <div className="mx-5 p-5">
          {/* <div className="flex text-2xl items-start justify-between font-semibold"> */}
          <div className="flex items-start justify-between mb-2 text-2xl font-semibold">
            {name}
            <span className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded-full uppercase tracking-wider">{category}</span>
          </div>
          <div className="flex gap-2 text-gray-600">
            <div>
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <div className="flex line-clamp-2">
              {address}
            </div>
          </div>
          <div className=" mt-3">
            <div className="mt-3 text-gray-600 line-clamp-3">
              {description}
            </div>


          </div>
        </div>
      </div>
    </Link>
  );
}

export const RightBar = ({ pagetitle, filterRecommended, setFilterRecommended , setSelectedProvince }) => {
  const isFilterEnabled = typeof setFilterRecommended === "function";

  return (
    <div className="hidden lg:flex flex-col gap-6 py-6 px-4 bg-gray-50 border-l border-gray-200 lg:sticky lg:top-0 h-screen w-80">
      <div className="px-2">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Search</h3>
        <SearchBar />
      </div>

      <div className={`${pagetitle === "homepage" ? "hidden" : "block"}`}>
        <div className="mb-6 px-2">
          <div className="border-l-4 border-amber-500 pl-3 mb-4">
            <h4 className="text-gray-800 font-bold">Recommend by ThaiXplore</h4>
          </div>
          <form method="post" className="space-y-2">
            <ChkBox
              title="Recommended"
              group="Recommended"
              isChecked={!!filterRecommended}
              onChange={() => {
                if (isFilterEnabled) {
                  setFilterRecommended(prev => !prev);
                }
              }}
            />
          </form>
        </div>

        <div className="mb-6 px-2">
          <div className="border-l-4 border-amber-500 pl-3 mb-4">
            <h4 className="text-gray-800 font-bold">Province</h4>
          </div>
          <ProvinceDropdown setProvince={setSelectedProvince}/>
        </div>
      </div>
    </div>
  );
};


const ChkBox = ({ title, group, isChecked, onChange }) => {
  return (
    <label className="flex items-center gap-3 py-1 px-2 rounded hover:bg-gray-100 cursor-pointer transition-colors">
      <input
        type="checkbox"
        name={group}
        checked={isChecked}
        onChange={onChange}
        className="w-4 h-4 appearance-none rounded-full border-2 border-gray-300 checked:border-amber-500 transition-colors"
      />
      <span className="text-gray-700">{title}</span>
    </label>
  );
};
