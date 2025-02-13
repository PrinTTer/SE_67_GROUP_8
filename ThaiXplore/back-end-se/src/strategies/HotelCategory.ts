import { BusinessCategoryStrategy } from "../interfaces/businessCategoryStrategy";
import { RoomModel } from "../models/room";
import { BusinessDetailModel } from "../models/businessDetail";


export class HotelCategory implements BusinessCategoryStrategy {
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
        return RoomModel.find({businessId : this.businessId});
    }
}

