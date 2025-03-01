import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { FileUploaded } from "./FileUploaded";

export const UploadDocumentBlock = () => {
    const [uploadDocument , setUpLoadDocument] = useState([]);

    const uploadFile = () => {
        const file = {
            name : "file1"
        }
        setUpLoadDocument((prev) => [...prev , file]);
    }

    const deleteFile = (fileIndex) => {
        setUpLoadDocument(uploadDocument.filter((obj , index) => index != fileIndex));
    }



    return (
        <div className="bg-white flex justify-between px-10 py-5 w-5xl drop-shadow-lg rounded-md">
            <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between font-semibold">
                    <div>
                        Document Upload
                    </div>
                    <div onClick={() => uploadFile()} className="text-green-400 text-xl cursor-pointer">
                        <FontAwesomeIcon icon={faCirclePlus}/>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {
                        uploadDocument.map((obj , index) => (
                            <FileUploaded key={index} index={index} deleteFile={deleteFile} item={obj}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}