import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { FileUploaded } from "./FileUploaded";

export const UploadDocumentBlock = () => {
    const [uploadDocument, setUpLoadDocument] = useState([]);
    const [file , setFile] = useState();

    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
        uploadFile(e.target.files[0].name);
    }

    const uploadFile = (fileName) => {
        const formatFile = {
            name : fileName,
            blob : file
        }
        setUpLoadDocument((prev) => [...prev, formatFile]);
    }

    const deleteFile = (fileIndex) => {
        setUpLoadDocument(uploadDocument.filter((obj, index) => index != fileIndex));
    }

    console.log(file);
    console.log(uploadDocument);

    return (
        <div className="bg-white flex justify-between px-10 py-5 w-5xl drop-shadow-lg rounded-md">
            <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between font-semibold">
                    <div>
                        Document Upload
                    </div>
                    <div className="flex text-green-400 w-fit h-fit cursor-pointer">
                        <input type="file" id="img" hidden onChange={handleChange} />
                        <label htmlFor="img" className="cursor-pointer text-lg"><FontAwesomeIcon icon={faCirclePlus}/></label>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {
                        uploadDocument.map((obj, index) => (
                            <FileUploaded key={index} index={index} deleteFile={deleteFile} item={obj} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}