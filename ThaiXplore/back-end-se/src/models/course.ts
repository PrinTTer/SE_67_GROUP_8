import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  businessId: { type: String, require: true },
  courseName: { type: String, require: true },
  menuList: [
    {
      name: { type: String, require: true },
      booked: { type: Number, require: true },
    },
  ],
  price: { type: Number, require: true },
  bookedDates: [
    {
      date: { type: Date, require: false },
      booked: { type: Number, require: false },
    },
  ],
  media : {type : [String] , require : true}
  
});

export const CourseModel = mongoose.model("Course",CourseSchema);

export const getCourseById = (id:string) => CourseModel.findById(id);
export const createCourse = (values: Record<string , any>) => new CourseModel(values).save().then((course)=>course.toObject());
export const deleteCoure = (id:string) => CourseModel.findByIdAndDelete(id);
export const updateCourse = (id:string , values:Record<string , any>) => CourseModel.findByIdAndUpdate(id , values);
