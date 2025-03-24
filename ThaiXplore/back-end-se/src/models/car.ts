import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    businessId : {type : String , require : true},
    carBrand : {type : String , require : true},
    licensePlate : {type : String , require : true},
    amountSeat : {type : Number , require : true},
    price : {type : Number , require : true},
    totalCars : {type : Number , require : true},
    bookedDates : [
        {
            date : {type : Date ,require : false},
            booked : {type : Number ,require : false},
        }
    ]
});

export const CarModel = mongoose.model("Car",CarSchema);

export const getCarById = (id:string) => CarModel.findById(id);
export const createCar = (values: Record<string , any>) => new CarModel(values).save().then((car)=>car.toObject());
export const deleteCar = (id:string) => CarModel.findByIdAndDelete(id);
export const updateCar = (id:string , values:Record<string , any>) => CarModel.findByIdAndUpdate(id , values);
  