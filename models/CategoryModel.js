import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name:String,
    image:{
       url:String,
       public_id:String
    },
})
export default mongoose.model("Category",CategorySchema)