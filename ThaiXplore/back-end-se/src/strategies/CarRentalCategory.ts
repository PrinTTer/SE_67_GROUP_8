import { BusinessCategoryStrategy } from "../interfaces/businessCategoryStrategy";
import { CarModel } from "../models/car";
import { BusinessDetailModel } from "../models/businessDetail";

export class CarRentalCategory implements BusinessCategoryStrategy {
  private businessId: String;

  constructor(bussinessId: String) {
    this.businessId = bussinessId;
  }
  getBusinessDetails(): object {
    return BusinessDetailModel.find({ businessId: this.businessId });
  }

  getPackageList(): object {
    return null;
  }

  getProvideService(): object {
    return CarModel.find({ businessId: this.businessId });
  }

  getProvideServiceById(id: String): object {
    return CarModel.findById(id);
  }

  getProvideServiceBookedDates(id: String, date: Date): object {
    return CarModel.find(
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
      return CarModel.updateOne(
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
      return CarModel.updateOne(
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
