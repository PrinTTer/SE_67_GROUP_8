import { DefaultEventsMap, Server } from "socket.io";

const users: { [key: string]: string } = {};

export default function WebSocket(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    io.on("connection", (socket) => {
        console.log("New user connected:", socket.id);

        socket.on("registerUser", (userId: string) => {
            users[userId] = socket.id;
            console.log(`User ${userId} registered with socket ID: ${socket.id}`);
            console.log("users list" , users);
        });

        socket.on("sendRequest", (data) => {
            const { receiverId, status } = data; 
            console.log("📨 New Request:", data);

            const receiverSocketId = users[receiverId]; 
            

            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newRequest", status); 
                console.log("users list" , users);
                console.log(receiverSocketId);
                console.log(`📩 Quotation sent to user ${receiverId}`);
            } else {
                console.log(`⚠️ User ${receiverId} not found`);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
            for (const userId in users) {
                if (users[userId] === socket.id) {
                    delete users[userId];
                    break;
                }
            }
        });
    });
}
