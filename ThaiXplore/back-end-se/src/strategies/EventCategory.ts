import { BusinessCategoryStrategy } from "../interfaces/businessCategoryStrategy";
import { EventModel } from "../models/event";
import { BusinessDetailModel } from "../models/businessDetail";

export class EventCategory implements BusinessCategoryStrategy {
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
        return EventModel.find({ businessId: this.businessId });
    }

    getProvideServiceById(id: String): object {
        return EventModel.findById(id);
    }

    getProvideServiceBookedDates(id: String, date: Date): object {
        return EventModel.findOne({ _id: id, "bookedDates.date": date });
    }

    updateBookedDatesById(id: String, date: Date, bookedAmount: Number): object {
        if (bookedAmount === 1) {
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
}
