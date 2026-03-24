import express, { Router } from "express"
import { createUser, deleteUser, verifyOtp } from "../controllers/UserController.js"

const route = express.Router();

route.post("/signup", createUser);
route.post("/verifyOtp", verifyOtp);
route.delete('/:id',deleteUser)


 

export default route;