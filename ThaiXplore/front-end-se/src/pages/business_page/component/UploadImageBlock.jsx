// import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useState } from "react";
// import { FileUploaded } from "./FileUploaded";

// export const UploadImage = (prop) => {
//     const {setUpLoadImg , uploadImg} = prop;

//     async function handleChange(e) {
//         if (!e.target.file) return;
//         const file = e.target.files[0];

//         uploadImg(file);
//     }

//     const uploadImg = (file) => {
//         setUpLoadImg((prev) => [...prev, file]);
//     }

//     const deleteImage = (fileIndex) => {
//         setUpLoadImg(uploadDocument.filter((obj, index) => index != fileIndex));
//     }

//     return (
//         <div className="bg-white flex justify-between px-10 py-5 w-5xl drop-shadow-lg rounded-md">
//             <div className="flex flex-col gap-2 w-full">
//                 <div className="flex justify-between font-semibold">
//                     <div>
//                         Document Upload
//                     </div>
//                     <div className="flex text-green-400 w-fit h-fit cursor-pointer">
//                         <input type="file" id="img" hidden onChange={handleChange} />
//                         <label htmlFor="img" className="cursor-pointer text-lg"><FontAwesomeIcon icon={faCirclePlus}/></label>
//                     </div>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                     {
//                         .map((obj, index) => (
//                             <FileUploaded key={index} index={index} deleteFile={deleteFile} item={obj} />
//                         ))uploadImg
//                     }
//                 </div>
//             </div>
//         </div>
//     );
// }