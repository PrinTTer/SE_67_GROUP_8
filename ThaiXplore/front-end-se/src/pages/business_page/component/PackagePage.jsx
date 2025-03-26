import {  faTimesCircle, faCheckCircle, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export const PackageBlock = () => {
    const [packages, setPackages] = useState([{ id: 1 }]); // Start with one package

    const addPackage = () => {
        setPackages([...packages, { id: Date.now() }]); // Add new package with unique ID
    };

    const removePackage = (id) => {
        setPackages(packages.filter(pkg => pkg.id !== id)); // Remove the selected package
    };

    return (
        <div className="shadow-md m-4 p-4 rounded-md bg-[#F1F5F9]">
            <div className='text-lg border-b-2'>Package List</div>
            
            {/* Add Package Button */}
            <div className='items-center flex mt-2 cursor-pointer' onClick={addPackage}>
                Add Package
                <FontAwesomeIcon icon={faCirclePlus} className="ml-2 text-blue-500 text-2xl" />
            </div>

            {/* Render Multiple Packages */}
            {packages.map((pkg) => (
                <PackageForm key={pkg.id} onRemove={() => removePackage(pkg.id)} />
            ))}
        </div>
    );
};
const PackageForm = (prop) => {
    const { onRemove } = prop
    const [services, setServices] = useState([{ name: '', amount: '' }]);

    const addService = () => {
        setServices([...services, { name: '', amount: '' }]);
    };

    const updateService = (index, key, value) => {
        const newServices = [...services];
        newServices[index][key] = value;
        setServices(newServices);
    };

    const removeService = (index) => {
        const newServices = services.filter((_, i) => i !== index);
        setServices(newServices);
    };

    return (
        <div className='bg-[#A0DEFF] shadow-md p-2 mt-2 '>
            <form className='grid grid-cols-2'>
                <div>
                    <p className='text-gray-700 font-bold '>Package Name</p>
                    <input type="text" className='shadow-md bg-white rounded-md w-60 p-2 ' />
                </div>
                <div>
                    <p className='text-gray-700 font-bold '>Expired Date</p>
                    <input type="date" className='shadow-md bg-white rounded-md w-60 p-2 ' />
                </div>

                <div>
                    <p className='text-gray-700 font-bold '>Price</p>
                    <input type="text" className='shadow-md bg-white rounded-md w-60 p-2 ' />
                </div>
                <div>
                    <p className='text-gray-700 font-bold '>Amount</p>
                    <input type="text" className='shadow-md bg-white rounded-md w-60 p-2 ' />
                </div>
                <div>
                    <p className='text-gray-700 font-bold '>Description</p>
                    <textarea className="bg-[#F8FAFC] p-2 shadow-md rounded-md w-60 "></textarea>
                </div>

                <div>
                    <p className='text-gray-700 font-bold '>Image</p>
                    <input type="file" className='shadow-md bg-white rounded-md w-60 p-2 ' />
                </div>

                {/* Section: Service In Package */}
                <div className="col-span-2">
                    <div className='items-center flex mt-2'>
                        <p className='text-gray-700 font-bold'>Service In Package</p>
                        <FontAwesomeIcon
                            icon={faCirclePlus}
                            className="ml-2 cursor-pointer text-black text-lg"
                            onClick={addService}
                        />
                    </div>

                    <div className='grid grid-cols-3 gap-2 mt-2'>
                        <p className='text-gray-700 font-bold'>Service Name</p>
                        <p className='text-gray-700 font-bold'>Amount</p>
                        <p></p>
                    </div>

                    {/* Add Service In Package */}

                    {services.map((service, index) => (
                        <div key={index} className='grid grid-cols-3 mt-2 items-center'>
                            <input
                                type='text'
                                className='shadow-md bg-white rounded-md w-60 p-2'
                                value={service.name}
                                onChange={(e) => updateService(index, 'name', e.target.value)}
                            />
                            <input
                                type='text'
                                className='shadow-md bg-white rounded-md w-60 p-2'
                                value={service.amount}
                                onChange={(e) => updateService(index, 'amount', e.target.value)}
                            />
                            <FontAwesomeIcon
                                icon={faTimesCircle}
                                className="text-red-500 text-2xl cursor-pointer"
                                onClick={() => removeService(index)}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end col-span-2 mt-4">
                    <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-4xl mr-2 border rounded-full bg-white cursor-pointer" onClick={onRemove} />
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-4xl rounded-full bg-white" />
                </div>
            </form>
        </div>
    );
};

// const ServiceInput =()=>{
//     return(
//         <div className='grid grid-cols-2'>
            
//             <input type='text' className='shadow-md bg-white rounded-md w-60 p-2 ' />
//             <input type='text' className='shadow-md bg-white rounded-md w-60 p-2 ' />
//         </div>
//     );
// }




