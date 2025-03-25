import { DefaultEventsMap, Server } from "socket.io";

// เก็บ mapping userId -> socket.id
const users: { [key: string]: string } = {};


export default function WebSocket(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    io.on("connection", (socket) => {
        console.log("New user connected:", socket.id);

        // ลงทะเบียน userId -> socket.id
        socket.on("registerUser", (userId: string) => {
            users[userId] = socket.id;
            console.log(`User ${userId} registered with socket ID: ${socket.id}`);
            console.log("users list" , users);
        });

        socket.on("sendQuotation", (data) => {
            const { receiverId, quotationData } = data; // รับข้อมูล receiverId และ quotation
            console.log("📨 New Quotation:", data);

            // ค้นหา socket.id ของผู้รับ
            const receiverSocketId = users[receiverId]; // ใช้ receiverId ค้นหา socket.id ของผู้รับ
            

            if (receiverSocketId) {
                // ส่งข้อมูลไปยังผู้รับ
                io.to(receiverSocketId).emit("newQuotation", quotationData); // ส่งข้อมูลไปยังผู้รับ
                console.log("users list" , users);
                console.log(receiverSocketId);
                console.log(`📩 Quotation sent to user ${receiverId}`);
            } else {
                console.log(`⚠️ User ${receiverId} not found`);
            }
        });


        // ลบ user ออกจาก users เมื่อ disconnect
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
