import mongoose from "mongoose";

const BusinessDetailSchema = new mongoose.Schema({
    businessId : {type: String , require : true},
    informationName : {type : String , require : true},
    details : {type : [String] , require : true}
});

export const BusinessDetailModel = mongoose.model("BusinessDetail" , BusinessDetailSchema);

export const createBusinessDetail = (values: Record<string , any>) => 
    new BusinessDetailModel(values).save().then((businessDetail)=>businessDetail.toObject());

