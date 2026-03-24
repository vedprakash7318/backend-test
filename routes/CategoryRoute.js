import express from "express"
import { createCategory, deleteCategory, getAllcategory, updateCategory } from "../controllers/CategoryController.js"
import upload from "../midleware/multer.js";

const route = express.Router();

route.post("/create",upload.single("image"), createCategory);
route.post("/create", createCategory);
route.get('/all',getAllcategory)
route.delete('/:id',deleteCategory)
route.put('/:id',updateCategory)

export default route
