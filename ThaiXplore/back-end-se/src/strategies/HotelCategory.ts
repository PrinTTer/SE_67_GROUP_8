import { BusinessCategoryStrategy } from "../interfaces/businessCategoryStrategy";
import { RoomModel } from "../models/room";
import { BusinessDetailModel } from "../models/businessDetail";
import { PackageModel } from "../models/package";


export class HotelCategory implements BusinessCategoryStrategy {
    private businessId: String;

    constructor(businessId: String) {
        this.businessId = businessId;
    }

    getBusinessDetails(): object {
        return BusinessDetailModel.find({ businessId: this.businessId });
    }

    getPackageList(): object {
        return PackageModel.find({ businessId : this.businessId });
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

    updateBookedDatesById(id: String, date: Date, bookedAmount: Number  , status: Boolean): object {
        if (status) {
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
    getServices(): Promise<any[]> {
        return RoomModel.find({ businessId: this.businessId });
      }
}

