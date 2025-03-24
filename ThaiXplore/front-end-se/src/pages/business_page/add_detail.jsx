import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { getTopic } from "../../data";
import { ServiceBlock } from "./component/ServiceBlock"
import { fetchData, postData, putData } from "../../services/apiService"
import { useParams } from 'react-router-dom';
import { PackageBlock } from './component/PackagePage'

const AddDetails = () => {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [business, setBusiness] = useState(null);


  const fetchBusiness = async () => {
    try {
      setIsLoading(true);
      const data = await fetchData(`/businesses/${id}`);
      setBusiness(data);
    } catch (error) {
      console.error("Error fetching business:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBusiness();
    }
  }, [id]);





  const [show, setShow] = useState(true)
  const [head, setHead] = useState(business?.business?.category)

  let type = business?.business?.category || "event";
  // alert(type)
  let topicBusines
  if (type == "hotel") {
    topicBusines = ["Hotel Information", "Room details", "Specify food and beverage service information", "Recreation facility", "Description"]
  }
  else if (type == "event") {
    topicBusines = ["Event Information", "Ticket details", "Description"]
  }
  else if (type == "restaurant") {
    topicBusines = ["Working Date Information", "Course details", "Description"]
  }
  else if (type == "carRental") {
    topicBusines = ["Working Date Information", "Car details", "Description"]
  }


  const toggle = (prop) => {
    const { title } = prop
    //alert(title+":"+head)
    if (head != title) {
      setShow(!show)
    }
    setHead(title)

  };
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="flex flex-5  flex-col shadow-md">
        <div className="flex-1 m-9">
          <div className='flex   rounded  gap-5 ml-2'>
            <div className=' px-5 py-2 rounded-t-lg   bg-[#D9D9D9] cursor-pointer ' onClick={() => toggle({ title: type })} >{type}</div>
            <div className=' px-5 py-2 rounded-t-lg   bg-[#D9D9D9] cursor-pointer ' onClick={() => toggle({ title: "Package" })}>Package</div>
          </div>
          <div className={`bg-[#D9D9D9] p-4 rounded-lg ${show ? "block" : "hidden"}`}>
            {
              business?.details?.map((element, index) => {
                return <Addblock key={index} title={element?.informationName} type={type} details={element} detailId = {element._id} topicBusines={topicBusines} />
              })
            }
            <ServiceBlock title={topicBusines[1]} type={type} />
          </div>
          <div className={`bg-[#D9D9D9] p-4 rounded-lg ${!show ? "block" : "hidden"}`}>
            <PackageBlock />
          </div>
        </div>

      </div>
    </>
  );
}

const Addblock = (prop) => {
  const { title, type, detailId, details } = prop
  const [show, setShow] = useState(true)
  const detail = getTopic({ title: title, type: type })
  const [inputs, setInputs] = useState([]);
  const toggle = (values) => {
    setInputs(values);
    setShow(!show)
  }
  
  // Function to show alert with the input values
  const handleCheck = async () => {
    try {
      const jsonOutput = {
        details: inputs
      }

      await putData(`/businessdetails/${detailId}`, jsonOutput);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to clear the input fields
  const handleClear = () => {
    setInputs([]);
    setShow(!show)
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  return (

    <div className="shadow-md m-4 p-4 rounded-md bg-[#F1F5F9]">
      <div className="grid grid-cols-2 border-b-2 p-1 text-lg">
        <div className='capitalize'>
          {title}
        </div>
        <div className="flex justify-end items-end ">
          <button>
            <FontAwesomeIcon icon={faPlus} className="border rounded-full p-1 cursor-pointer" onClick={() => toggle(details?.details)} />
          </button>
        </div>
      </div>

      <div className={`grid ${Array.isArray(detail) ? " grid-cols-2" : "grid-cols-1"} gap-4 p-2 bg-[#A0DEFF] shadow-md rounded-md mt-2`}>
        {Array.isArray(detail) ? (
          detail.map((item, index) => (

            <div key={index} className="text-gray-700 mr-20">
              <div className='font-bold'>{item}</div>

              <input type={`${item?.toLowerCase().includes("date") || item?.toLowerCase().includes("period") || item?.toLowerCase().includes("round") ? "datetime-local" : (item?.toLowerCase().includes("image") ? "file" : "text")}`}
                className={`${addInput} bg-[#F8FAFC] p-2 rounded-md shadow-md ${!show ? "flex" : "hidden"}`} onChange={(e) => handleInputChange(index, e.target.value)} value={inputs[index] || ''}/>

              <div className={`${show ? "flex" : "hidden"}`}>
                {details?.details[index]}
              </div>

            </div>
          ))
        ) : (
          <div className="flex flex-col">
            {
              details?.details?.map((item, index) => (

                <div key={index} className="text-gray-700 mr-20">

                  <div className={`${show ? "flex" : "hidden"}`}>
                    {item}
                  </div>

                </div>
              ))
            }
            <div className={`${!show ? "flex" : "hidden"}`}>
              <BlockInput detail={detail} setInputs={setInputs} inputs={inputs} handleInputChange={handleInputChange} addInput={addInput} />
            </div>
          </div>
        )}
        <div className={`${!show ? "flex" : "hidden"} justify-end  col-span-2`}>
          <div>
            <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-4xl mr-2 border rounded-full bg-white" onClick={handleClear} />
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-4xl rounded-full bg-white" onClick={handleCheck} />
          </div>
        </div>
      </div>

    </div>
  );
}

const BlockInput = (prop) => {

  const { detail, setInputs, inputs, handleInputChange, addInput } = prop


  // Function to remove an input field
  const removeInput = (index) => {
    setInputs(inputs.filter((_, i) => i !== index));
  };


  return (
    <div className="flex flex-col flex-1     ">
      <div className="flex justify-between items-center  p-1 text-lg">
        <div className="flex items-center space-x-2">
          <div className={`cursor-pointer ${detail != "description" ? "block" : "hidden"} `}>
            <FontAwesomeIcon icon={faPlus} onClick={addInput} />
          </div>
          <p className="text-gray-700 font-bold">{detail}</p>
        </div>
      </div>

      <div className={`grid grid-cols-2 gap-4 p-4  ${detail != "description" ? "block" : "hidden"}`}>

        {inputs.map((value, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              className="bg-[#F8FAFC] p-2 rounded-md  shadow-md"
              value={value || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className="cursor-pointer text-red-500"
              onClick={() => removeInput(index)}
            />
          </div>
        ))}

      </div>
      <div className={` p-4   ${detail == "description" ? "block" : "hidden"}`}>
        <textarea className="bg-[#F8FAFC] p-2 shadow-md   rounded-md w-full h-25 " onChange={(e) => handleInputChange(0, e.target.value)} ></textarea>
      </div>

    </div>
  );
}


export default AddDetails;


const dataJson = (title, inputs, detail) => {
  let json;

  if (Array.isArray(detail) && detail.length > 0) {
    json = {
      // businessId: "",
      informationName: title,
      details: inputs.map((value, index) => ({
        label: detail[index],
        value: value
      })),
      __v: 0
    };
  } else {
    //  เป็น array ของ string 
    json = {

      // businessId: "",
      informationName: title,
      details: inputs.filter(item => item.trim() !== ""),
      __v: 0
    };
  }

  console.log("Detail : ", JSON.stringify(json));
  return json;
};
