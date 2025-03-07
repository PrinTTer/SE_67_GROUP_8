import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FileUploaded = (prop) => {
    const {index, deleteFile , item} = prop;

    return (
        <div className="flex justify-between px-4 py-2 w-xl border border-gray-300 rounded-md">
            <div>
                {item.name}
            </div>
            <div onClick={() => deleteFile(index)} className="text-red-400 text-lg cursor-pointer">
                <FontAwesomeIcon icon={faCircleXmark}/>
            </div>
        </div>
    );
}