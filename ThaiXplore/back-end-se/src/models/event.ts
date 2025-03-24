import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    businessId : {type : String , require : true},
    ticketType : {type : String , require : true},
    price : {type : Number , require : true},
    quantity : {type : Number , require : true},
    eventDate : {type : Date , require : true},
    start : {type : Date , require : true},
    end : {type : Date , require : true},
    bookedDates : [
        {
            date : {type : Date , require : true},
            booked : {type : Number , require : true}
        }
    ]
});

export const EventModel = mongoose.model("Activities" , EventSchema);

export const getEventById = (id:string) => EventModel.findById(id);
export const createEvent = (values: Record<string , any>) => new EventModel(values).save().then((activity)=>activity.toObject());
export const deleteEvent =(id:string) => EventModel.findByIdAndDelete(id);
export const updateEvent = (id:string , values:Record<string , any>) => EventModel.findByIdAndUpdate(id , values);


