import { CategoryType } from "../../models/adminModels/categoryType.js";
import ErrorHandler from "../../middelwares/error.js";


export const newCategory = async (req, res, next) => {
    try {
        const { category, subCategories } = req.body;

        let checkCategory = await CategoryType.findOne({category});
        if(checkCategory) return next(new ErrorHandler("Category already Exist", 404));

        await CategoryType.create({
            category, subCategories,
        })

        res.status(201).json({
            success: true,
            message: "Category Added Successfully",
        })
    } catch (error) {
        next(error)
    }
};


export const getCategories = async (req, res, next) => {
    try {
        const categories = await CategoryType.find();
        res.status(201).json({
            success: true,
            categories,
        })
    } catch (error) {
        next(error)
    }
};


export const updateCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const { category, subCategories } = req.body;

        const checkCategory = await CategoryType.findById(categoryId);
        if (!checkCategory) return next(new ErrorHandler("Category not Found", 404))

        if (category) {
            checkCategory.category = category;
        }
        if (subCategories) {
            checkCategory.subCategories = subCategories;
        }

        await checkCategory.save();
        res.status(201).json({
            success: true,
            message: "Category updated successfully",
            checkCategory,
        });

    } catch (error) {
        next(error)
    }
};


export const deleteCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await CategoryType.findById(categoryId);

        if (!category) return next(new ErrorHandler("Weather not Found", 404))

        await category.deleteOne();

        res.status(201).json({
            success: true,
            message: "Category Deleted"
        })
    } catch (error) {
        next(error)
    }
};