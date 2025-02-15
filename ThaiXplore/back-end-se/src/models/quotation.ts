import mongoose from "mongoose";

const QuotationSchema = new mongoose.Schema({
    userId : {type : String ,require : true},
    businessId : {type : String, require : true},
    name :{type : String,require : true},
    companyName :{type : String,require : true},
    email :{type : String,require : true},
    phoneNumber :{type : String,require : true},
    date :{type : Date,require : true},
    description :{type : String,require : false},
    detail :[],
    status : {type : String},
    total : {type : Number}
});

export const QuotationModel = mongoose.model("Quotation",QuotationSchema);

export const createQuotation = (values: Record<string , any>) => new QuotationModel(values).save().then((quotation)=>quotation.toObject());