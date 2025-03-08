import { useState } from 'react';
// import { getTopic } from "../../../data";
import { faPlus, faTimesCircle, faCheckCircle, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ServiceBlock = (prop) => {
    const { title, type } = prop;
    const [show, setShow] = useState(true);
    const [forms, setForms] = useState([{ id: Date.now() }]); // Store forms with unique ID

    const detail = getTopic(type);

    const toggle = () => {
        setShow(!show);
    };

    const addForm = () => {
        setForms([...forms, { id: Date.now() }]); // Add new form with unique ID
    };

    const removeForm = (id) => {
        setForms(forms.filter((form) => form.id !== id)); // Remove form based on unique ID
    };

    return (
        <div className="shadow-md m-4 p-4 rounded-md bg-[#F1F5F9]">
            <div className="grid grid-cols-2 border-b-2 p-1 text-lg mb-2">
                <div>{title}</div>
                <div className="flex justify-end items-end">
                    <button onClick={toggle}>
                        <FontAwesomeIcon icon={faPlus} className="border rounded-full p-1 cursor-pointer" />
                    </button>
                </div>
            </div>

            <div className={`${!show ? "block" : "hidden"}`}>
                <div className='items-center flex'>
                    Add {title.split(" ")[0]} 
                    <FontAwesomeIcon 
                        icon={faCirclePlus} 
                        className="ml-2 cursor-pointer text-blue-500 text-2xl" 
                        onClick={addForm} 
                    />
                </div>

                {forms.map((form) => (
                    <form key={form.id} className="mt-4">
                        <div className={`grid ${Array.isArray(detail) ? "grid-cols-2" : "grid-cols-1"} gap-4 p-2 bg-[#A0DEFF] shadow-md rounded-md mt-2`}>
                            
                        {Array.isArray(detail) &&
                            detail.map((item, i) => (
                                <div key={i} className="text-gray-700 font-bold">
                                    <div>{item}</div>
                                    {item.toLowerCase() === "menulist" ? (
                                        <MenuListComponent />
                                    ) : item.toLowerCase().includes("image") ? (
                                       <FileUpload />
                                    ) : (
                                        <input
                                            type={
                                                item.toLowerCase().includes("date") ||
                                                item.toLowerCase().includes("period") ||
                                                item.toLowerCase().includes("round")||
                                                item.toLowerCase().includes("start")||
                                                item.toLowerCase().includes("end")
                                                    ? "datetime-local"
                                                    : "text"
                                            }
                                            className="bg-[#F8FAFC] p-2 rounded-md w-60 shadow-md"
                                        />
                                    )}
                                </div>
                        ))}
                            
                            <div className="flex justify-end col-span-2">
                                <div>
                                    <FontAwesomeIcon 
                                        icon={faTimesCircle} 
                                        className="text-red-500 text-4xl mr-2 border rounded-full bg-white cursor-pointer" 
                                        onClick={() => removeForm(form.id)} 
                                    />
                                    <FontAwesomeIcon 
                                        icon={faCheckCircle} 
                                        className="text-green-500 text-4xl rounded-full bg-white" 
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                ))}
            </div>
        </div>
    );
};


const MenuListComponent = () => {
    const [menuList, setMenuList] = useState([{ id: Date.now(), menu: "", amount: "" }]);

    const addMenu = () => {
        setMenuList([...menuList, { id: Date.now(), menu: "", amount: "" }]);
    };

    const removeMenu = (id) => {
        setMenuList(menuList.filter((item) => item.id !== id));
    };

    const updateMenu = (id, key, value) => {
        setMenuList(menuList.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
    };

    return (
        <div className="grid grid-cols-2 gap-2 bg-[#D6E5FA] p-4 rounded-md">
            
            <div className="col-span-1 text-gray-700 font-bold">
                Menu
                <FontAwesomeIcon 
                        icon={faCirclePlus} 
                        className="ml-2 cursor-pointer text-black text-lg" 
                        onClick={addMenu} 
                />
            </div>
            <div className="col-span-1 text-gray-700 font-bold">Amount</div>
            
            {menuList.map((item) => (
                <div key={item.id} className="grid grid-cols-2 gap-2 items-center col-span-2">
                    <input
                        type="text"
                        className="bg-[#F8FAFC] p-2 rounded-md shadow-md "
                        value={item.menu}
                        onChange={(e) => updateMenu(item.id, "menu", e.target.value)}
                    />
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="bg-[#F8FAFC] p-2 rounded-md w-full shadow-md "
                            value={item.amount}
                            onChange={(e) => updateMenu(item.id, "amount", e.target.value)}
                        />
                        <FontAwesomeIcon
                            icon={faTimesCircle}
                            className="text-red-500 text-lg ml-2 cursor-pointer "
                            onClick={() => removeMenu(item.id)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};


const FileUpload = () => {
    const [fileName, setFileName] = useState("");

    const handleChange = (event) => {
        const file = event.target.files[0]; // Get the first file
        if (file) {
            setFileName(file.name); // Set file name to state
        }
    };

    return (
        <div className="relative flex flex-col text-green-400 w-fit h-fit cursor-pointer bg-[#F8FAFC] shadow-md p-2 rounded-md">
            {/* Hidden Input Covering Entire Area */}
            <input 
                type="file" 
                id="img" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={handleChange} 
            />

            <div className="flex items-center">
                <FontAwesomeIcon icon={faCirclePlus} className="text-lg" />
                <span className="ml-2 text-gray-700">{fileName || "No file selected"}</span>
            </div>
        </div>
    );
};


const getTopic = (category) => {
    let List = [];
    if(category === 'hotel'){
        List = ['roomType', 'guestAmount', 'roomSize', 'price', 'facilities',"image"];
    }
    else if (category === 'event'){
        List = ['ticketType', 'price',  'start', 'end',"image"];
    }
    else if (category === 'carRental'){
        List = ['carBrand',  'amountSeat', 'price',"image"];
    }
    else if (category === 'restaurant'){
        List = ['courseName', 'price', 'menuList',"image"];
    }
    return List;
};

