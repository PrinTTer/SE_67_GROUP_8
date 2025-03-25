import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSocket, disconnectSocket } from "../features/socketSlice";
import { io } from "socket.io-client";


export default function useSocket(user) {
  const socketRef = useRef(null);

  useEffect(() => {
    // เชื่อมต่อ WebSocket
    socketRef.current = io("http://localhost:3000", { withCredentials: true });

    // ตรวจสอบการเชื่อมต่อและ socket.id
    socketRef.current.on("connect", () => {
      console.log("Connected to WebSocket with socket ID:", socketRef.current.id); // ตรวจสอบ socket ID
    });

    // ลงทะเบียน User ID ใน WebSocket
    if (user?._id) {
      console.log("Registering user with ID:", user._id);
      socketRef.current.emit("registerUser", user._id);
    }

    // เมื่อ component ถูก unmount ให้ disconnect socket
    return () => {
      console.log("Disconnecting from WebSocket");
      socketRef.current.disconnect(); // ปิดการเชื่อมต่อเมื่อออกจาก Component
    };
  }, [user]); // ใช้ user เป็น dependency เพราะต้องการเชื่อมต่อใหม่เมื่อ user เปลี่ยน

  return socketRef; // คืนค่า socketRef ไปใช้ใน component อื่น
}


