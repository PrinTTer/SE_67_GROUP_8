import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EditingField } from "./editingField";
import { putData } from "../../../services/apiService";

const ProfileForm = () => {
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState("");
    const [error, setError] = useState("");  // เพิ่ม state สำหรับเก็บ error

    useEffect(() => {
        if (user) {
            setData(user);
        }

        // ดึงข้อความ error จาก sessionStorage เมื่อหน้าโหลดใหม่
        const storedError = sessionStorage.getItem('profileFormError');
        if (storedError) {
            setError(storedError);
            sessionStorage.removeItem('profileFormError');  // ลบ error จาก sessionStorage หลังการใช้งาน
        }
    }, [user]);

    const handleFieldUpdate = async (field, value) => {
        let updatedData = { ...data, [field]: value };

        if (field === "name") {
            const nameParts = value?.trim().split(" ");
            const firstName = nameParts[0] || "";
            const lastName = nameParts.slice(1).join(" ") || "";
            updatedData = { ...data, firstName, lastName };
        }

        setData(updatedData);

        try {
            // เรียก API ตาม field ที่ต้องการอัปเดต
            if (field === "password") {
                await putData("/users/change-password", updatedData);
            } else if (field === "email") {
                await putData("/users/change-email", updatedData);
            } else {
                await putData("/users", updatedData);
            }
            console.log(`Updated ${field} successfully!`);
            setError("");  // เคลียร์ error หลังจากทำการบันทึกสำเร็จ
        } catch (error) {
            console.error(`Error updating ${field}:`, error);
            setError("Something went wrong while updating the information.");  // แสดงข้อความ error จาก API

            // เก็บ error ใน sessionStorage ก่อนทำการรีเฟรช
            sessionStorage.setItem('profileFormError', "Something went wrong while updating the information.");
        }
    };

    return (
        <div className="flex flex-1 w-full h-full flex-col bg-gray-50">
            <h1 className="text-2xl font-bold mx-5 my-5">Profile</h1>
            <div className="flex flex-1 mx-5 justify-center items-start">
                <div className="grid grid-cols-1 gap-4">
                    <EditingField label="Name" field="name" value={data?.firstName + " " + data?.lastName} hasProfileImage={true} profileImage={data?.media} actionLabel="Edit" onSave={handleFieldUpdate} />
                    <EditingField label="Email" field="email" value={data?.email} actionLabel="Edit" onSave={handleFieldUpdate} />
                    <EditingField label="Phone" field="phoneNumber" value={data?.phoneNumber} actionLabel="Edit" onSave={handleFieldUpdate} />
                    <EditingField label="Address" field="address" value={data?.address} actionLabel="Edit" onSave={handleFieldUpdate} />
                    <EditingField label="Password" field="password" actionLabel="Edit" onSave={handleFieldUpdate} />
                </div>
            </div>
            {/* แสดงข้อความ error หากมี */}
            {error && <div className="text-red-500 mt-2">{sessionStorage.getItem}</div>}
        </div>
    );
};

export default ProfileForm;
