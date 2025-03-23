import { BusinessCategoryStrategy } from "../interfaces/businessCategoryStrategy";
import { CourseModel } from "../models/course";
import { BusinessDetailModel } from "../models/businessDetail";
import { PackageModel } from "../models/package";


export class RestaurantCategory implements BusinessCategoryStrategy {
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
        return CourseModel.find({ businessId: this.businessId });
    }

    getProvideServiceById(id: String): object {
        return CourseModel.findById(id);
    }

    getProvideServiceBookedDates(id: String, date: Date): object {
        return CourseModel.find(
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

    updateBookedDatesById(id: String, date: Date, bookedAmount: Number, status: Boolean): object {
        if (status) {
            return CourseModel.updateOne(
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
            return CourseModel.updateOne(
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

