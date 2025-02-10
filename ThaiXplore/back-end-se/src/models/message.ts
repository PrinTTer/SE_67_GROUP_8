import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    chatRoomId : {type : String , require : true},
    senderUserId : {type : String , require : true},
    message : {type : String , require : true},
    createdMessageAt : {type : String , require : true}
});

export const MessageModel = mongoose.model("Messages" , MessageSchema);

export const getMessage = () => MessageModel.find();
export const getMessageById = (id:String) => MessageModel.findById(id);

export const createMessage = (values: Record <string , any>) => new MessageModel(values).save().then((message) => message.toObject()); 

export const deleteMessageById = (id:String) => MessageModel.findOneAndDelete(id);

export const updateMessageById = (id:String , values:Record <string , any>) => MessageModel.findByIdAndUpdate(id, values);