import { NavBarWithOutText } from "../../component/navbar";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlus } from '@fortawesome/free-solid-svg-icons';
import { getTopic } from "../../data";


const AddBusiness = () => {
    const type = "hotel"
    let topicBusines
    if (type == "hotel"){
        topicBusines =["Hotel Information", "Service", "Specify food and beverage service information", "Recreation facility", "Description"]
    }
    else if(type == "event") {
        topicBusines =["Event Information", "Service", "Description"]
    }
    else{
        topicBusines =["Working Date Information", "Service"]
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
            <div className={`${!show ? "block" : "hidden"} grid grid-cols-2`}>
                    <div className={`grid ${Array.isArray(detail) ? "grid-cols-2" : "grid-cols-1"} gap-4 p-2`}>
                    {Array.isArray(detail) ? (
                        detail.map((item, index) => (
                        
                        <div key={index} className="text-gray-700 font-bold">
                          {item}
                          <input type="text" className="bg-amber-50 p-2 rounded-md" />
                        </div>
                      ))
                    ) : (
                        <div>
                            <div className="flex items-center">
                                <p className="text-gray-700">{detail}</p>
                                <FontAwesomeIcon icon={faPlus} className="ml-3 border rounded-full  cursor-pointer" onClick={() => createInput()} />
                            </div>
                            <input type="text" className={`bg-amber-50  rounded-md ${detail=="description" ? "p-4" : "p-1"} ` }/>
                            
                        </div>
                    )}
                  </div>
            </div>
            
        </div>
    );
}
const createInput=({detail})=>{
    return(<input type="text" className={`bg-amber-50  rounded-md ${detail=="description" ? "p-4" : "p-1"} ` }/>)
}
export default AddBusiness;