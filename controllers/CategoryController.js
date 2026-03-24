import Category from "../models/CategoryModel.js";

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        const img = req.file
        console.log(img);
        
        if (!name) {
            return res.status(400).json({ message: "name is reqiured", success: false });
        }
        const category = await Category.findOne({ name })
        if (category) {
            return res.status(400).json({ message: "Category allready exist", success: false });
        }

        const newCategory = await Category.create({ name, image:{
                url: img.path,
                public_id: img.filename
        } });

        if (!newCategory) {
            return res.status(400).json({ message: "Category cration faild", success: false });
        }
        return res.status(201).json({ message: "Category created successfully", success: true });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server is error", success: false });
    }

}

export const getAllcategory = async (req, res) => {
    try {
        const category = await Category.find();
        if (!category) {
            return res.status(404).json({ message: "Data not found", success: false });
        }
        return res.status(200).json({ message: "category list", success: true, category });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server is error", success: false });

    }
}

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "id is required", success: false });
        }
        const deleteCategory = await Category.findByIdAndDelete(id);
        if (!deleteCategory) {
            return res.status(404).json({ message: "category not found", success: false });
        }
        return res.status(200).json({ message: "category deleted successfully", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server is error", success: false });
    }
}

// Update category
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        if (!id) {
            return res.status(400).json({ message: "id is required", success: false });
        }
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "category not found", success: false });
        }
        if (name) category.name = name

        await category.save();
        return res.status(200).json({ message: "category updated successfully", success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server is error", success: false });
    }
};