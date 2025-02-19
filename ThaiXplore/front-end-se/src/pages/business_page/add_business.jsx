import { NavBarWithOutText } from "../../component/navbar";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlus,faTimes,faTimesCircle,faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { getTopic } from "../../data";


const AddBusiness = () => {
    const type = "hotel"
    let topicBusines
    if (type == "hotel"){
        topicBusines =["Hotel Information", "Room details", "Specify food and beverage service information", "Recreation facility", "Description"]
    }
    else if(type == "event") {
        topicBusines =["Event Information", "Ticket details", "Description"]
    }
    else if(type == "food"){
        topicBusines =["Working Date Information", "Course details", "Description"]
    }
    else if(type == "car"){
      topicBusines =["Working Date Information", "Car details", "Description"]
  }

      const [show, setShow] = useState(true)
      const [head, setHead] = useState(type)
      const toggle = (prop) => {
        const {title} = prop
        if(head != title){
          setShow(!show)
        }
        setHead(title)
        
      };
    return(
        <div className="flex flex-col-reverse lg:flex-row flex-1 ">
            <NavBarWithOutText/>
            <div className="flex flex-5  flex-col">
                <div className="flex-1 m-9">
                        <div className='flex   rounded  gap-5 ml-2'>
                          <div  className=' px-5 py-2 rounded-t-lg   bg-[#D9D9D9] cursor-pointer ' onClick={() => toggle({ title: type })} >{type}</div>
                          <div  className=' px-5 py-2 rounded-t-lg   bg-[#D9D9D9] cursor-pointer ' onClick={() => toggle({ title: "Package" })}>News&Package</div>
                        </div>
                        <div className="bg-[#D9D9D9] p-4 rounded-lg">
                        {
                        topicBusines.map((element,index)=>{
  
                          return <Addblock key={index} title={element} type={type}/>
                        })
                       }
                        </div>
                </div>
               
            </div>
        </div>
    );
}

const Addblock = (prop) =>{
    const { title , type} = prop 
    const [show, setShow] = useState(true)
    const detail = getTopic({title : title , type :type})
    const toggle = ()=>{
        setShow(!show)
    }
    return(

        <div className="border m-4 p-4 rounded-md">
            <div className="grid grid-cols-2 border-b-2 p-1 text-lg">
                <div>
                    {title}
                </div>
                <div className="flex justify-end items-end ">
                    <button>
                        <FontAwesomeIcon icon={faPlus} className="border rounded-full p-1 cursor-pointer" onClick={() => toggle()} />
                    </button>
                </div>
            </div>
            <div className={`${!show ? "block" : "hidden"} `}>
                  <div className={`grid ${Array.isArray(detail) ? " grid-cols-2" : "grid-cols-1"} gap-4 p-2 bg-[#69A4DA]   border rounded-md mt-2`}>
                    {Array.isArray(detail) ? (
                        detail.map((item, index) => (
                        
                        
                          <div key={index} className="text-gray-700 font-bold mr-20">
                            <div>{item}</div>
                            <input type="text" className="bg-amber-50 p-2 rounded-md" />
                          </div>
                        
                      ))
                    ) : (
                        <div className="flex ">
                           <BlockInput detail={detail} />
                        </div>
                    )}
                    <div className="flex justify-end  col-span-2">
                      <div>
                        <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-4xl mr-2 border rounded-full bg-white" />
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-4xl rounded-full bg-white" />
                      </div>
                    </div>
                  </div>
            </div>
            
        </div>
    );
}
const BlockInput=(prop)=>{
    const [inputs, setInputs] = useState([]);
    const {detail} = prop
    const addInput = () => {
        setInputs([...inputs, ""]);
      };
    
      // Function to remove an input field
      const removeInput = (index) => {
        setInputs(inputs.filter((_, i) => i !== index));
      };
    
      // Function to handle input changes
      const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
      };
    return( 
        <div className="flex flex-col flex-1     ">
        <div className="flex justify-between items-center  p-1 text-lg">
          <div className="flex items-center space-x-2">
            <div className={`cursor-pointer ${detail != "description" ? "block" : "hidden"} `}>
            <FontAwesomeIcon icon={faPlus} className={`cursor-pointer  `}  onClick={addInput} />
            </div>
            <p className="text-gray-700 font-bold">{detail}</p>
          </div>
        </div>
  
        <div className={`grid grid-cols-2 gap-4 p-4  ${detail != "description" ? "block" : "hidden"}`}>
          {inputs.map((value, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                className="bg-amber-50 p-2 rounded-md border"
                value={value}
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
            <input type="textarea" className="bg-amber-50 p-2   rounded-md "  />
        </div>
       
      </div>
    );
}
export default AddBusiness;