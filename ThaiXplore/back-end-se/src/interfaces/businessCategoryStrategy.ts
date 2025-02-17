export interface BusinessCategoryStrategy {
    getBusinessDetails() : object;
    getProvideService() : object;
    getPackageList() : object;
    getProvideServiceById(id:String) : object;
    updateBookedDatesById(id: String , date: Date , bookedAmount: Number , status: Boolean) : object;
    getProvideServiceBookedDates(id: String , date: Date): object;
}