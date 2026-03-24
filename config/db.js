import mongoose from "mongoose";
import EnvData from "./EnvData.js"

const connectDB = async () => {
    try {
        const conn=mongoose.connect(EnvData.DB_URL)
        console.log('mongodb connected successfully');

    }catch (error) {
        console.log('mongodb connected faild !'+error);
        
    }
}
export default connectDB