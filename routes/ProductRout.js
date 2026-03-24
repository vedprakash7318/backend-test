import express from "express"
import { createProduct,getAllProduct , deleteProduct , updateProduct} from "../controllers/ProductController.js";
import upload from "../midleware/multer.js";
const route = express.Router();


route.post("/create", upload.single("image"),createProduct);
route.get('/all',getAllProduct)
route.delete("/delete/:id", deleteProduct);
route.patch("/update/:id",upload.single("image"), updateProduct);

export default route