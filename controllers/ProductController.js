import Product from "../models/ProductModel.js"

export const createProduct = async (req, res) => {
    try {
        const { name, mrp, stock, description, price, category } = req.body;
        if (!name || !description || !mrp || !stock || !price || !category) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const newProduct = await Product.create({
            name,
            price,
            stock,
            description,
            mrp,
            category,
            image:{
                url:req.file.path,
            }

        });
        if (!Product) {
            return res.status(400).json({ message: "Product creation failed", success: false });
        }
            
        return res.status(201).json({ message: "Product created successfully", success: true, product: newProduct });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:"Internal server error", success: false });
    }
};

export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find().populate("category")
        if (!products) {
            return res.status(404).json({ message: "Product not found", success: false });
        }
        return res.status(200).json({ message: "Product fetched successfully", success: true, products });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }
        return res.status(200).json({ message: "Product deleted successfully", success: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, mrp, stock, description, price, category } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, {    
            name,
            price,
            stock,
            description,
            mrp,
            category,
            image:{
                url:req.file.path,
            }
        }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found", success: false });
        }
        return res.status(200).json({ message: "Product updated successfully", success: true, product: updatedProduct });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};