import mongoose, { Model } from "mongoose";

const BusinessSchema = new mongoose.Schema({
    userId : {type : String , require : true},
    businessName : {type : String , require : true},
    description : {type : String , require : false},
    address : {type : String , require : true},
    phoneNumber : {type : String , require : true},
    email : {type : String , require : true},
    categories : [String],
    media : [],
    verify : {
        document : [],
        status : {type : String , require : true}
    }
});

export const BusinessModel = mongoose.model("Business" , BusinessSchema);

export const getBusiness = () => BusinessModel.find();
export const getBusinessById = (id: String) => BusinessModel.findById(id);
export const getBusinessByEmail = (email: String) => BusinessModel.find({email});
export const getBusinessByuserId = (userId: String) => BusinessModel.find({userId : userId});

export const createBusiness = (values:Record <string , any>) => new BusinessModel(values).save().then((business) => business.toObject());
export const deletBusinessById = (id:String) => BusinessModel.findOneAndDelete({_id : id});
export const updateBusinessById = (id:String , values:Record <string , any>) => BusinessModel.findByIdAndUpdate(id , values);