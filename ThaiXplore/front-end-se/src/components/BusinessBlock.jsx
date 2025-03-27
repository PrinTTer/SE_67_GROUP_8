import { faChevronDown, faFileLines, faLocationDot, faPenToSquare, faTrash, faImage, faCircleXmark, faCirclePlus, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { BusinessEditBtn } from "./BusinessEditBtn";
import { Link } from 'react-router-dom';
import { deleteData, postDataWithFiles, putData } from "../services/apiService";
import { toast } from "react-toastify";

export const BusinessBlock = (prop) => {
    const { business, fetchBusinesses } = prop;
    const [description, setDescription] = useState("");
    const [isShow, setIsShow] = useState(false);

    //const [isMouseEnter, setIsMouseEnter] = useState(false);


    const truncateDescription = (text, maxLength = 180) => {
        return text.length <= maxLength ? text : text.substring(0, maxLength) + '...';
      };

      const isTextTooLong = (text) => {
        if (!text) return "";
        const words = text.split(" ");
        const truncated = words.slice(0, 40).join(" ");
        return words.length > 40 ? truncated + "..." : truncated;
      };
      
      

    //   const checkIsShow = () => {
    //     if (isShow) {
    //       setDescription(isTextTooLong(business.description));
    //     } else {
    //       setDescription(business.description);
    //     }
    //     setIsShow(!isShow);
    //   };

    const checkIsShow = () => {
        setIsShow(prev => !prev);
      };
      
      

      useEffect(() => {
        if (business?.description) {
          setIsShow(false); // ซ่อนไว้ก่อนเสมอ
          setDescription(isTextTooLong(business.description));
        }
      }, [business?.description]);
      
      
      


    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedBusinessId, setSelectedBusinessId] = useState(null);
    const [showDocs, setShowDocs] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const [uploadDocument, setUpLoadDocument] = useState([]);
    const [documentList, setDocumentList] = useState(business.verify?.document || []);

    useEffect(() => {
        if (showDocs) {
            setDocumentList(business.verify?.document || []);
        }
    }, [showDocs]);

    const fechData = async () => {
        fetchBusinesses();
        setShowDocs(false)
    };


    const confirmDeleteBusiness = () => {
        setSelectedBusinessId(business._id);
        setShowConfirm(true);
    };

    // delete business
    const handleDelete = async () => {
        try {
            await deleteData(`/businesses/${selectedBusinessId}`);
            toast.success("✅ Business deleted successfully!", {
                position: "top-right",
                autoClose: 2500
            });
            window.location.reload();
        } catch (error) {
            console.error("Error deleting business:", error);
            toast.error("❌ Failed to delete business. Please try again.");
        }
        setShowConfirm(false);
    };

    const deleteDocument = async (index) => {
        try {
            await deleteData(`/businesses/${business._id}/documents/${index + 1}`);
            // ลบออกจาก list บน frontend
            setDocumentList((prev) => prev.filter((_, i) => i !== index));
            toast.success("✅ Document deleted!");
        } catch (error) {
            console.error("Error deleting document:", error);
            toast.error("❌ Failed to delete document");
        }
    };



    const addDocument = async (file) => {
        try {
            await postDataWithFiles(
                `/businesses/${business._id}/documents`,
                [file],
                null,
                "businesses_verifies"
            );

            // สมมติ backend เพิ่มท้าย array เสมอ
            setDocumentList((prev) => [...prev, file.name]);
            toast.success("✅ Document uploaded!");
        } catch (error) {
            console.error("Error uploading document:", error);
            toast.error("❌ Failed to upload document");
        }
    };



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
        <>
            <div className="bg-white grid lg:grid-cols-[25%_60%_15%] w-full drop-shadow-xl rounded-xl">
                <div className="w-full aspect-[3/2] bg-gray-100 flex items-center justify-center relative overflow-hidden rounded-lg">
                    {business.media.length > 0 ? (
                        <div className="flex h-full w-full">
                            {/* รูปซ้ายใหญ่ (ภาพแรก) */}
                            <div className="w-2/3 h-full overflow-hidden rounded-l-lg">
                                <img
                                    src={`http://localhost:3000/public/uploads/businesses/images/${business.media[0]}`}
                                    alt="main-img"
                                    className="w-full h-full object-cover"
                                    onClick={() => setShowGallery(true)}
                                />
                            </div>

                            {/* รูปขวา 2 ช่องซ้อน */}
                            <div className="w-1/3 h-full flex flex-col gap-1 pl-1">
                                {business.media.slice(1, 3).map((img, idx) => (
                                    <div key={idx} className="relative h-1/2 w-full overflow-hidden rounded">
                                        <img
                                            src={`http://localhost:3000/public/uploads/businesses/images/${img}`}
                                            alt={`side-img-${idx}`}
                                            className="w-full h-full object-cover"
                                            onClick={() => setShowGallery(true)}
                                        />
                                        {/* Overlay ถ้ามีรูปเหลือ */}
                                        {idx === 1 && business.media.length > 3 && (
                                            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center text-white font-semibold text-xl rounded"
                                                onClick={() => setShowGallery(true)}>
                                                +{business.media.length - 3}
                                            </div>

                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full">
                            <FontAwesomeIcon icon={faImage} className="text-4xl mb-2" />
                            <span className="text-sm">No picture</span>
                        </div>
                    )}

                    {/* {category && (
                                <div className="absolute top-3 left-3">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                    {category}
                                  </span>
                                </div>
                              )} */}
                </div>
                <div className="mx-5 p-5">
                    {/* <div className="flex text-2xl items-start justify-between font-semibold"> */}
                    <div className="flex items-start justify-between mb-2 text-2xl font-semibold">
                        {business.businessName}
                        <div className="flex gap-2 flex-wrap">

                            {business.verify?.status === "rejected" && (
                                <FontAwesomeIcon icon={faCircleExclamation} className="text-red-600 text-lg px-2 py-1" title="view description" onClick={() => setShowDescription(true)} />
                            )}
                            <span className={`text-xs px-2 py-1 rounded-full uppercase tracking-wider ${business.verify?.status === "approved" ? "bg-green-100 text-green-900"
                                : business.verify?.status === "pending" ? "bg-blue-100 text-blue-900"
                                    : "bg-red-100 text-red-900"
                                }`}>
                                {business.verify?.status}
                            </span>

                            <span className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded-full uppercase tracking-wider">
                                {business.category}
                            </span>
                        </div>

                    </div>

                    <div className="flex gap-2 text-gray-600">
                        <div>
                            <FontAwesomeIcon icon={faLocationDot} />
                        </div>
                        <div className="flex">
                            {business.address}
                        </div>
                    </div>
                    <div className=" mt-3">
                    {/* <div className="break-words overflow-hidden max-w-full">
  {isShow ? business.description : isTextTooLong(business.description)}
</div> */}


<p className="flex items-start text-sm text-gray-600 break-words">
                  {truncateDescription(description)}
                </p>

                        {/* <div onClick={() => checkIsShow()}
                            className="text-blue-500 flex gap-1 cursor-pointer transition-all hover:text-blue-300">
                            <div>{isShow ? "Show less" : "Show more"}</div>
                            <div className={`${isShow ? "rotate-180" : ""} transition-all ease-in-out`}>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="flex gap-16 justify-end p-5">
                    <BusinessEditBtn icon={faFileLines} popup={"Document"} onClick={() => setShowDocs(true)} />
                    <Link to={`/profile/mainBusiness/createBusiness/adddetails/${business._id}`}>
                        <BusinessEditBtn icon={faPenToSquare} popup={"Edit"} />
                    </Link>

                    <BusinessEditBtn icon={faTrash} popup={"Delete"} onClick={confirmDeleteBusiness} />

                </div>
            </div>

            {showDescription && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
      <div className="mb-4 pb-3 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">Description</h2>
        <p className="text-gray-700 mt-1">{business.verify.description}</p>
        <p className="text-red-500 text-sm mt-2">
          * Please upload new document(s) before requesting approval again.
        </p>
      </div>

      <div className="mt-4 flex justify-end space-x-3">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded"
          onClick={() => setShowDescription(false)}
        >
          Close
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={async () => {
            try {
              await putData(
                `/businesses/${business._id}`,
                
                {
                  verify: {
                    status: "pending",
                    document: business.verify.document || [],
                    description: "",
                  },
                  
                }
              );
              toast.success("🔄 Request sent! Status changed to pending.");
              setShowDescription(false);
              fetchBusinesses(); // อัปเดตข้อมูลใหม่
            } catch (error) {
              toast.error("❌ Failed to re-submit approval.");
              console.error(error);
            }
          }}
        >
          Request Approval Again
        </button>
      </div>
    </div>
  </div>
)}


            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[350px]">
                        <h2 className="text-lg font-bold text-red-600">Delete Confirmation</h2>
                        <p className="text-gray-700 mt-1">Are you sure you want to delete this business?</p>
                        <div className="mt-4 flex justify-end space-x-3">
                            <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setShowConfirm(false)}>Cancel</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}


            {/* Document Modal */}
            {showDocs && (


                <div className="fixed inset-0 flex justify-center items-center z-50 p-4 bg-black/30">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative animate-fadeIn">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800">Business Documents</h3>
                            <>
                                <button
                                    className="text-green-500 hover:text-gray-700 focus:outline-none"
                                    onClick={() => document.getElementById("fileInput").click()}
                                >
                                    <FontAwesomeIcon icon={faCirclePlus} className="h-6 w-6" />
                                </button>
                                <input
                                    type="file"
                                    id="fileInput"
                                    hidden
                                    onChange={(e) => {
                                        if (e.target.files.length > 0) {
                                            addDocument(e.target.files[0]);
                                        }
                                    }}
                                />
                            </>

                        </div>

                        {documentList.length > 0 ? (
                            <ul className="space-y-3 max-h-80 overflow-y-auto">
                                {documentList.map((file, index) => (
                                    <li key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex justify-between items-center">
                                        <a
                                            href={`http://localhost:3000/public/uploads/businesses/verifies/${file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 truncate max-w-[80%]"
                                        >
                                            {file}
                                        </a>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            title="Delete this file"
                                            onClick={() => deleteDocument(index)}
                                        >
                                            <FontAwesomeIcon icon={faCircleXmark} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="py-12 text-center text-gray-500">No documents attached</div>
                        )}


                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => fechData()}
                                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                               
                            >
                                Close
                            </button>

                        </div>
                    </div>
                </div>
            )}

        </>
    );
}