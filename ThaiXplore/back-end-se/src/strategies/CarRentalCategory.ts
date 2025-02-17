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
}
