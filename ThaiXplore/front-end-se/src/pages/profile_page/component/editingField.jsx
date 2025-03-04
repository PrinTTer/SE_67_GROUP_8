import { useState, useEffect } from "react";
export const EditingField = (prop) => {
    const { label, field, value, hasProfileImage, actionLabel, onSave } = prop;
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState(value?.split(" ")[1] || "");

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    useEffect(() => {
        setFirstName(value?.split(" ")[0]);
        setLastName(value?.split(" ")[1]);
    }, [value]);
    
    const handleSave = () => {
        setIsEditing(false);

        let updatedValue;
        if (field === "name") {
            onSave(field,`${firstName} ${lastName}`);
        } else {
            updatedValue = inputValue; // ใช้ค่าปกติ
            onSave(field, updatedValue); // ✅ ส่งค่ากลับไปที่ ProfileForm
        }
    };

    console.log("editingField:",value);

    return (
        <div className="flex items-center bg-white w-4xl h-[5rem] rounded-xs p-4 shadow-md border border-gray-300">
            {hasProfileImage && (
                <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white text-lg">
                    👤
                </div>
            )}
            <div className="flex flex-col flex-1 ml-3">
                <p className="text-sm font-semibold text-gray-600">{label}</p>
                {isEditing ? (
                    field === "name" ? (
                        <div className="flex space-x-2">
                            <input 
                                type="text" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e?.target.value)}
                                placeholder="First Name"
                                className="w-1/2 p-2     text-lg border rounded-md focus:ring-2 focus:ring-blue-400"
                            />
                            <input 
                                type="text" 
                                value={lastName} 
                                onChange={(e) => setLastName(e?.target.value)}
                                placeholder="Last Name"
                                className="w-1/2 p-2 text-lg border rounded-md focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    ) : (
                        <input 
                            type="text" 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e?.target.value)}
                            className="w-2/3 p-2 text-lg border rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                    )
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