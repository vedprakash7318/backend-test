import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    mrp:Number,
    stock:Number,
    image:{
        public_id:String,
        url:String
    },
    isActive:{
        type:Boolean,
        default:true
    },
    description:String,
    isActive:{type:Boolean, default:true},
    category:{type:mongoose.Schema.Types.ObjectId, ref:"Category"},
   
});
export default mongoose.model("Product",productSchema)