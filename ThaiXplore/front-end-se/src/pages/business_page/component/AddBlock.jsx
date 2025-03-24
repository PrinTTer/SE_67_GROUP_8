import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { getTopic } from "../../../data";
import BlockInput from './BlockInput';
import { putData } from '../../../services/apiService';

const Addblock = (prop) => {
  const { title, type, detailId, details } = prop
  const [show, setShow] = useState(true)
  const detail = getTopic({ title: title, type: type })
  const [inputs, setInputs] = useState([]);
  const toggle = (values) => {
    setInputs(values);
    setShow(!show)
  }
  
  useEffect(()=>{
    setInputs(details.details);
  },[])

  // Function to show alert with the input values
  const handleCheck = async () => {
    try {
      const jsonOutput = {
        details: inputs
      }
      
      await putData(`/businessdetails/${detailId}`, jsonOutput);
      window.location.reload();
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
                {inputs[index]}
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

export default Addblock;