import { useState } from "react";
export const EditingField = (prop) => {
    const { label, value, hasProfileImage,actionLabel, onSave } = prop;
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleSave = () => {
        setIsEditing(false); // ปิดโหมดแก้ไข
        onSave(value);  // ส่งค่ากลับไปที่ ProfileForm
    };


    return(
            <div className="flex items-center bg-white w-4xl h-[5rem] rounded-xs p-4 shadow-md border border-gray-300">
                {hasProfileImage && (
                    <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white text-lg">
                        👤 {/* หรือเปลี่ยนเป็น <img src="profile.jpg" className="rounded-full w-12 h-12" /> */}
                    </div>
                )}
                <div className="flex flex-col flex-1 ml-3">
                    <p className="text-sm font-semibold text-gray-600">{label}</p>
                    {isEditing ? (
                    <input type="text" value={value} onChange={(e) => setInputValue(e.target.value)}
                        className="w-1/2 p-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    ) : (
                        <p className="text-lg text-gray-800">{value}</p>
                    )}
                </div>
                <div>
                    {isEditing ? (
                        <button onClick={handleSave} className="text-green-500 hover:text-green-700 font-medium">
                            Save
                        </button>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700 font-medium">
                            {actionLabel}
                        </button>
                    )} 
                </div>
            </div>
    );
}

{/* <label className="text-2xl font-medium block">{label}</label>
            {isEditing ? (
                <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 text-xl border rounded-md" />
            ) : (
                <p className="p-2 text-xl border rounded-md bg-gray-200">{value}</p>
            )} */}

            // <p className="text-lg text-gray-800">{value}</p>