import { BusinessCategoryStrategy } from "../interfaces/businessCategoryStrategy";
import { EventModel } from "../models/event";
import { BusinessDetailModel } from "../models/businessDetail";
import { PackageModel } from "../models/package";

export class EventCategory implements BusinessCategoryStrategy {
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
        return EventModel.find({ businessId: this.businessId });
    }

    getProvideServiceById(id: String): object {
        return EventModel.findById(id);
    }

    getProvideServiceBookedDates(id: String, date: Date): object {
        return EventModel.find(
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

    updateBookedDatesById(id: String, date: Date, bookedAmount: Number , status: Boolean): object {
        if (status) {
            return EventModel.updateOne(
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
            return EventModel.updateOne(
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
            return EventModel.find({ businessId: this.businessId });
          }
}
