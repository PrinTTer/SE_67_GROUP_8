import { BusinessCategoryStrategy } from "../interfaces/businessCategoryStrategy";
import { EventModel } from "../models/event";
import { BusinessDetailModel } from "../models/businessDetail";

export class EventCategory implements BusinessCategoryStrategy {
    private businessId: String;

    constructor (businessId: String) {
        this.businessId = businessId;
    }

    getBusinessDetails(): object {
        return BusinessDetailModel.find({businessId : this.businessId});
    }

    getPackageList(): object {
        return null;
    }

    getProvideService(): object {
        return EventModel.find({businessId : this.businessId});
    }
}
