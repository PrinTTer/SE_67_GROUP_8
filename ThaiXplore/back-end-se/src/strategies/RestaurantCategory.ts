import { BusinessCategoryStrategy } from "../interfaces/businessCategoryStrategy";
import { CourseModel } from "../models/course";
import { BusinessDetailModel } from "../models/businessDetail";


export class RestaurantCategory implements BusinessCategoryStrategy {
    private businessId: String;

    constructor(businessId: String){
        this.businessId = businessId;
    }

    getBusinessDetails(): object {
        return BusinessDetailModel.find({businessId : this.businessId});
    }

    getPackageList(): object {
        return null;
    }

    getProvideService(): object {
        return CourseModel.find({businessId : this.businessId});
    }
}

