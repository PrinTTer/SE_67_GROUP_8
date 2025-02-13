import { HotelCategory } from "../strategies/HotelCategory";
import { BusinessCategoryStrategy } from "../interfaces/businessCategoryStrategy";

export class BusinessCategoryFactory {
    static createCategory(categoryType : String , businessId : String): BusinessCategoryStrategy | null {
        switch (categoryType) {
            case "hotel" : 
                return new HotelCategory(businessId);
        }
    }
}