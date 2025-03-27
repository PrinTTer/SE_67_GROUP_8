import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function useSocket(user) {
  const socketRef = useRef(null);

  useEffect(() => {
    // Disconnect existing connection
    const disconnectPreviousSocket = () => {
      if (socketRef.current) {
        console.log("Disconnecting previous WebSocket connection");
        socketRef.current.off("connect");
        socketRef.current.off("disconnect");
        socketRef.current.off("connect_error");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };

    // Create new socket connection
    const createSocketConnection = () => {
      disconnectPreviousSocket();

      // Always attempt to create socket, even if user is not immediately available
      socketRef.current = io(import.meta.env.VITE_API_URL, { 
        withCredentials: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });

      // Connection success handler
      socketRef.current.on("connect", () => {
        console.log("Connected to WebSocket with socket ID:", socketRef.current.id);
        
        // Register user only after successful connection
        if (user?._id) {
          console.log("Registering user with ID:", user?._id);
          socketRef.current.emit("registerUser", user?._id);
        }
      });

      // Connection error handler
      socketRef.current.on("connect_error", (error) => {
        console.error("WebSocket connection error:", error);
      });

      // Disconnection handler
      socketRef.current.on("disconnect", (reason) => {
        console.log("WebSocket disconnected:", reason);
      });
    };

    // Attempt to create socket connection
    createSocketConnection();

    // Cleanup function
    return () => {
      disconnectPreviousSocket();
    };
  }, [user?._id]); // Still react to user ID changes

  return socketRef;
}