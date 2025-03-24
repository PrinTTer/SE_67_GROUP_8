import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

export default BlockInput;