import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    userId : {type : String , require : true},
    withUserId : {type : String , require : true},
    quotationId : {type : String , require : false},
    dealStatus : {type : String , require : false},
    createdAt : {type : Date , require : true}
});

export const ChatModel = mongoose.model("Chat" , ChatSchema);

export const getChat = () => ChatModel.find();
export const getChatById = (id: String) => ChatModel.findById(id);
export const getChatByUserId = (userId: String) => ChatModel.find({userId : userId});

export const createChat = (values:Record <string , any>) => new ChatModel(values).save().then((chat) => chat.toObject());

export const updateChatById = (id:String , values:Record <string , any>) => ChatModel.findOneAndUpdate(id , values);

export const deleteChatById = (id:String) => ChatModel.findOneAndDelete(id);
