import { BusinessCategoryStrategy } from "../interfaces/businessCategoryStrategy";
import { RoomModel } from "../models/room";
import { BusinessDetailModel } from "../models/businessDetail";


export class HotelCategory implements BusinessCategoryStrategy {
    private businessId: String;

    constructor(businessId: String) {
        this.businessId = businessId;
    }

    getBusinessDetails(): object {
        return BusinessDetailModel.find({ businessId: this.businessId });
    }

    getPackageList(): object {
        return null;
    }

    getProvideService(): object {
        return RoomModel.find({ businessId: this.businessId });
    }

    getProvideServiceById(id: String): object {
        return RoomModel.findById(id);
    }

    getProvideServiceBookedDates(id: String, date: Date): object {
        return RoomModel.find(
            {
                _id: id, 
                "bookedDates.date": date 
            },
            {
                bookedDates: {
                    $elemMatch: {
                        date: date 
                    }
                }
            }
        );
    }

    updateBookedDatesById(id: String, date: Date, bookedAmount: Number): object {
        if (bookedAmount === 1) {
            return RoomModel.updateOne(
                {
                    _id: id,
                    "bookedDates.date": { $ne: date }
                },
                {
                    $push: {
                        bookedDates: {
                            date: date,
                            booked: bookedAmount
                        }
                    }
                },
                {
                    upsert: true
                }
            );
        } else {
            return RoomModel.updateOne(
                {
                    _id: id,
                    "bookedDates.date": date
                },
                {
                    $set: {
                        "bookedDates.$.booked": bookedAmount
                    }
                }
            );
        }
    }
}

