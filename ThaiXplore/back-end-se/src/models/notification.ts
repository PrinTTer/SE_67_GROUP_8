import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    fromUserId : {type : String , require : true},
    toUserId : {type : String , require : true},
    title : {type : String , require : true},
    description : {type : String , require : true},
    date : {type : Date , require : true},

});

export const NotificationModel = mongoose.model("Notification",NotificationSchema);

export const createNotification = (values: Record<string , any>) => new NotificationModel(values).save().then((notification)=>notification.toObject());