import mongoose, { Model } from "mongoose";

const BusinessSchema = new mongoose.Schema({
    userId : {type : String , require : true},
    businessName : {type : String , require : true},
    description : {type : String , require : false},
    address : {type : String , require : true},
    phoneNumber : {type : String , require : true},
    email : {type : String , require : true},
    media : {type : [String] , require : false},
    category : {type : String , require : true},
    verify : {
        document : {type : [String] , require : false},
        status : {type : String , require : false}
    },
    followBusiness : {type : [String] , require : false},
});

export const BusinessModel = mongoose.model("Business" , BusinessSchema);

export const getBusiness = () => BusinessModel.find();
export const getBusinessById = (id: String) => BusinessModel.findById(id);
export const getBusinessByEmail = (email: String) => BusinessModel.find({email});
export const getBusinessByuserId = (userId: String) => BusinessModel.find({userId : userId});
export const getBusinessByCategory = (category: String) => BusinessModel.find({category : category});

export const createBusiness = (values:Record <string , any>) => new BusinessModel(values).save().then((business) => business.toObject());
export const deletBusinessById = (id:String) => BusinessModel.findOneAndDelete({_id : id});
export const updateBusinessById = (id:String , values:Record <string , any>) => BusinessModel.findByIdAndUpdate(id , values);