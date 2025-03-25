import { faCircleXmark, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const UploadImageBlock = ({ uploadImages, setUploadImages }) => {
  const handleChange = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setUploadImages((prev) => [...prev, ...files]);
  };

  const deleteImage = (index) => {
    setUploadImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white flex flex-col px-6 py-4 w-full border border-gray-200 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4 font-semibold">
        <div>Image Upload</div>
        <label htmlFor="image-upload" className="cursor-pointer text-green-500 text-lg">
          <FontAwesomeIcon icon={faCirclePlus} />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            hidden
            multiple
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-4">
        {uploadImages.map((img, index) => {
          const url = URL.createObjectURL(img);
          return (
            <div key={index} className="relative w-28 h-28 border rounded overflow-hidden">
              <img
                src={url}
                alt={`upload-${index}`}
                className="object-cover w-full h-full"
              />
              <button
                onClick={() => deleteImage(index)}
                className="absolute top-0 right-0 text-red-500 hover:text-red-600"
              >
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
