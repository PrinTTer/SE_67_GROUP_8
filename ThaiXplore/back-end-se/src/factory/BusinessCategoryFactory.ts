import { HotelCategory } from "../strategies/HotelCategory";
import { BusinessCategoryStrategy } from "../interfaces/businessCategoryStrategy";
import { CarRentalCategory } from "../strategies/CarRentalCategory";
import { RestaurantCategory } from "../strategies/RestaurantCategory";

export class BusinessCategoryFactory {
    static createCategory(categoryType : String , businessId : String): BusinessCategoryStrategy | null {
        switch (categoryType) {
            case "hotel" : 
                return new HotelCategory(businessId);
            case "carRental" :
                return new CarRentalCategory(businessId);
            case "restaurant" :
                return new RestaurantCategory(businessId);
        }
    }
}