import { HotelCategory } from "../strategies/HotelCategory";
import { BusinessCategoryStrategy } from "../interfaces/businessCategoryStrategy";
import { CarRentalCategory } from "../strategies/CarRentalCategory";

export class BusinessCategoryFactory {
    static createCategory(categoryType : String , businessId : String): BusinessCategoryStrategy | null {
        switch (categoryType) {
            case "hotel" : 
                return new HotelCategory(businessId);
            case "carRental" :
                return new CarRentalCategory(businessId);
        }
    }
}