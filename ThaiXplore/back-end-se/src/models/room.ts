import { values } from "lodash";
import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    businessId : {type : String , require : true},
    roomType : {type : String , require : true},
    guestAmount : {type : Number , require : true},
    roomSize : {type : String , require : true},
    price : {type : Number , require : true},
    facilities : {type : [String] , require : true},
    totalRooms : {type : Number , require : true},
    bookedDates : [
        {
            date : {type : Date , require : false},
            booked : {type : Number , require : false},
        }
    ],
    media : {type : [String] , require : true}
});

export const RoomModel = mongoose.model("Room" , RoomSchema);

export const getRoomById = (id:string) => RoomModel.findById(id);

export const createRoom = (values : Record<string , any>) => new RoomModel(values).save().then((room)=>room.toObject());

export const deleteRoom = (id:string) => RoomModel.findByIdAndDelete(id);

export const updateRoom = (id:string , values:Record<string , any>) => RoomModel.findByIdAndUpdate(id , values);