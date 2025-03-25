import { useEffect, useState } from 'react';
import { getTopic } from './ServiceBlock';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteData } from '../../../services/apiService';
import { CarEdit } from './EditService/Car';
import { RestaurantEdit } from './EditService/Course';
import { HotelEdit } from './EditService/Hotel';
import { EventEdit } from './EditService/Event';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ShowService = (prop) => {
  const { id, type, data, fetchData ,imgType } = prop;
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [editItem, setEditItem] = useState(null);
  console.log(id);
  const title = data?.services;
  const Topic = getTopic(type);
  const [imageType, setImageType] = useState();
  
  useEffect (()=>{
    //Fetch Image
    fetchData();

    switch(type) {
      case "hotel":
        setImageType("rooms");
        break;
      case "carRental":
        setImageType("cars");
        break;
      case "event":
        setImageType("events");
        break;
      case "restaurant":
        setImageType("courses");
        break;
    }
    console.log("IMAGE " + imageType)
  },[imgType])

  if (!Array.isArray(Topic) || Topic.length === 0 ) {
    return (
      <div className="p-8 rounded-lg bg-amber-50 text-amber-700 text-center shadow border border-amber-200">
        No Topic available
      </div>
    );
  }

  if (!Array.isArray(title) || title.length === 0) {
    return (
      <div className="p-8 rounded-lg bg-amber-50 text-amber-700 text-center shadow border border-amber-200">
        No services available
      </div>
    );
  }

  const deleteService = async (id ) => {
    let endpoint;
    if (type === "hotel") {
      endpoint = '/room/';
    } else if (type === "carRental") {
      endpoint = '/cars/';
    } else if (type === "event") {
      endpoint = '/events/';
    } else if (type === "restaurant") {
      endpoint = '/courses/';
    }

    try {
      await deleteData(endpoint + id);
      //await deleteData(endpoint+`${id}/images/1`);

      fetchData();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setShowEditPopUp(true);
  };

  // Get service type label for display
  const getServiceTypeLabel = () => {
    switch (type) {
      case "hotel": return "Hotel Room";
      case "carRental": return "Car Rental";
      case "event": return "Event";
      case "restaurant": return "Restaurant";
      default: return "Service";
    }
  };

  // Map edit components to reduce repetitive conditional checks
  const editComponents = {
    hotel: HotelEdit,
    restaurant: RestaurantEdit,
    carRental: CarEdit,
    event: EventEdit
  };

  const EditComponent = editComponents[type];

  return (
    <div className="p-6 rounded-lg gap-5 mb-5 bg-amber-50 shadow-md border border-amber-200">
      <div className="col-span-2 border-b border-amber-300 p-3 flex items-center justify-between">
        <span className="font-bold text-xl text-amber-800">{getServiceTypeLabel()} Details</span>
      </div>

      {title.map((item, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 bg-white shadow-sm rounded-lg mt-4 hover:shadow-md transition-all duration-300 border border-amber-100">
          <div className='row-span-5'>
            
              <img
                src={`http://localhost:3000/public/uploads/services/${imageType}/${item.media[0]}`}
                alt={item.media[0]}
                className="w-full h-auto object-cover rounded-md shadow-lg"

              />
            
          </div>

          {Topic.map((field, fieldIndex) => (
            <div key={fieldIndex} className="flex flex-col p-2">
              <div className="font-semibold text-amber-700 mb-2">{field}</div>
              {Array.isArray(item[field]) ? (
                <ul className="list-disc pl-5 grid grid-cols-2 gap-1 text-gray-600">
                  {item[field].map((value, i) => (
                    typeof value === "object" ? (
                      <li key={i} className="text-sm">{value.name}</li>
                    ) : (
                      <li key={i} className="text-sm">{value}</li>
                    )
                  ))}
                </ul>
              ) : (
                <div className="text-gray-600">
                  {field.toLowerCase().includes("date") || field.toLowerCase().includes("start") || field.toLowerCase().includes("end") ? (
                    new Date(item[field]).toLocaleString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).replace(",", "")
                  ) : (
                    item[field]
                  )}
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-end items-center col-span-1 md:col-span-3 gap-4 mt-2 pt-3 border-t border-amber-100">
            <button
              onClick={() => handleEditClick(item)}
              className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition flex items-center gap-2"
              aria-label={`Edit ${getServiceTypeLabel()}`}
            >
              <FontAwesomeIcon icon={faPenToSquare} className="text-sm" /> Edit
            </button>

            <button
              onClick={() => deleteService(item._id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition flex items-center gap-2"
              aria-label={`Delete ${getServiceTypeLabel()}`}
            >
              <FontAwesomeIcon icon={faTrash} className="text-sm" /> Delete
            </button>
          </div>
        </div>
      ))}

      {showEditPopUp && editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-xl w-[90%] max-w-4xl overflow-y-auto max-h-[80vh] border border-amber-200">
            <h2 className="text-2xl font-bold mb-6 text-amber-800 border-b pb-3 border-amber-200">
              Edit {getServiceTypeLabel()}
            </h2>

            <div className="overflow-y-auto pr-2">
              {EditComponent && <EditComponent item={editItem} setShowEditPopUp={setShowEditPopUp} fetchData={fetchData} />}
            </div>

            
          </div>
        </div>
      )}
    </div>
  );
};
