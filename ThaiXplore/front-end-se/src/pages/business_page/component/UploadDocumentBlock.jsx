import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { FileUploaded } from "./FileUploaded";


export const UploadDocumentBlock = (prop) => {
    const {setUpLoadDocument , uploadDocument} = prop;

    async function handleChange(e) {
        if (!e.target.files) return;
        const file = e.target.files[0];

        uploadFile(file);
    }

    const uploadFile = (file) => {
        setUpLoadDocument((prev) => [...prev, file]);
    }

    const deleteFile = (fileIndex) => {
        setUpLoadDocument(uploadDocument.filter((obj, index) => index != fileIndex));
    }

    return (
        <div className="bg-white flex flex-col px-6 py-4 w-full border border-gray-200 rounded-md shadow-sm">
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