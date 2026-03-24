import jwt from "jsonwebtoken"
import EnvData from "../config/EnvData.js"

const generateToken = (id)=>{
return jwt.sign({ id }, EnvData.JWT_SECRET, { expiresIn: "1d"})
}
export default generateToken;