import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { getTopic } from "../../../data";
import BlockInput from './BlockInput';
import { putData } from '../../../services/apiService';
import TimeSchedule from './WorkTime';

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

  const handleClear = () => {
    setInputs([]);
    setShow(!show);
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
    <div className="shadow-md m-4 p-4 rounded-md bg-[#ffff] border border-[#FFA500]">
      <div className="grid grid-cols-2 border-b-2 border-[#FFA500] p-1 text-lg text-[#8B4513]">
        <div className='capitalize'>
          {title}
        </div>
        <div className="flex justify-end items-end">
          <button>
            <FontAwesomeIcon 
              icon={faPlus} 
              className="border border-[#FFA500] rounded-full p-1 cursor-pointer text-[#8B4513] hover:bg-[#FFA500] hover:text-white" 
              onClick={() => toggle(details?.details)} 
            />
          </button>
        </div>
      </div>

      <div className={`grid ${Array.isArray(detail) ? "grid-cols-2" : "grid-cols-1"} gap-4 p-2 bg-[#FFF4E0] shadow-md rounded-md mt-2 border border-[#FFA500]`}>
        {Array.isArray(detail) ? (
          detail.map((item, index) => (
            <div key={index} className="text-[#8B4513] mr-20">
              <div className='font-bold'>{item}</div>

              <input 
                type={`${
                  item?.toLowerCase().includes("date") || 
                  item?.toLowerCase().includes("period") || 
                  item?.toLowerCase().includes("round") ? "datetime-local" : 
                  (item?.toLowerCase().includes("image") ? "file" : "text")
                }`}
                className={`
                  ${addInput} 
                  bg-[#FFFAF0] 
                  p-2 
                  rounded-md 
                  shadow-md 
                  border 
                  border-[#FFA500] 
                  text-[#8B4513] 
                  ${!show ? "flex" : "hidden"}
                `} 
                onChange={(e) => handleInputChange(index, e.target.value)} 
                value={inputs[index] || ''}
              />

              <div className={`${show ? "flex" : "hidden"} text-[#8B4513]`}>
                {inputs[index]}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col">
            {details?.details?.map((item, index) => (
              <div key={index} className="text-[#8B4513] mr-20">
                <div className={`${show ? "flex" : "hidden"} bg-[#ffff] w-60 m-2 p-3 rounded-3xl  shadow-md`}>
                  {detail === "Day Work" ? (
                    <div className="grid grid-cols-2 gap-3">
                    {/* ตรวจสอบว่า item ไม่เป็น null หรือ undefined ก่อนการใช้ replace */}
                    <div className="text-[#8B4513]">
                      {item ? item.replace(",", " ").split(" ")[0] : ""}
                    </div>
                    <div className="text-[#8B4513]">
                      {item ? item.replace(",", " ").replace(",", "-").split(" ")[1] : ""}
                    </div>
                  </div>
                  ) : (
                    <div className="text-[#8B4513]">{item}</div>
                  )}
                </div>
              </div>

            ))}
            <div className={`${!show ? "flex" : "hidden"}`}>
              {detail === "Day Work" ? (
                <TimeSchedule 
                  detail={detail} 
                  setInputs={setInputs} 
                  inputs={inputs} 
                  handleInputChange={handleInputChange} 
                  addInput={addInput} 
                />
              ) : (
                <BlockInput 
                  detail={detail} 
                  setInputs={setInputs} 
                  inputs={inputs} 
                  handleInputChange={handleInputChange} 
                  addInput={addInput} 
                />
              )}
            </div>
          </div>
        )}
        <div className={`${!show ? "flex" : "hidden"} justify-end col-span-2`}>
          <div>
            <FontAwesomeIcon 
              icon={faTimesCircle} 
              className="text-red-500 text-4xl mr-2 border border-red-500 rounded-full bg-white hover:bg-red-100" 
              onClick={handleClear} 
            />
            <FontAwesomeIcon 
              icon={faCheckCircle} 
              className="text-green-500 text-4xl rounded-full bg-white border border-green-500 hover:bg-green-100" 
              onClick={handleCheck} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addblock;