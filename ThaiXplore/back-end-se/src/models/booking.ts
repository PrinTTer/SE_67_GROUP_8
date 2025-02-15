import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    userId : {type : String , require : true},
    businessId : {type : String , require : true},
    bookingDate : {type : Date , require : true},
    status : {type : String , require : true},
    bookingTransaction : {
        paymentMethod : {type : String , require : true},
        transactionDate : {type : Date , require : true}
    },
    description : {type : String , require : true},
    totalPrice : {type : Number , require : true},
    bookingDetail : [
        {
            serviceId : {type : String , require : true},
            startDate : {type : Date , require : false},
            endDate : {type : Date , require : false},
            amount : {type : Number , require : true}
        }
    ]
});

export const bookingModel = mongoose.model("Bookings" , BookingSchema);

export const createBooking = (values: Record<string , any>) => new bookingModel(values).save().then((booking)=>booking.toObject());

export const getBooking = () => bookingModel.find();
export const getBookingById = (id:String) => bookingModel.findById(id);

export const deleteBooking = (id:String) => bookingModel.findOneAndDelete({_id : id});
export const updateBooking = (id:String , values:Record<string , any>) => bookingModel.findByIdAndUpdate(id , values);