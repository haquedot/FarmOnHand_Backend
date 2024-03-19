const httpStatusCode = require("../constant/httpStatusCode");
const CategoryModel = require('../models/categoryModel');

const AddCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const name=categoryName;
        if (!name) {
            return res.status(httpStatusCode.BAD_REQUEST).json({
                success: false,
                message: "name feild is empty"
            })
        }

        const existingCategory = await CategoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(httpStatusCode.CONFLICT).json({
                success: false,
                message: "The category is already exist !!"
            })
        }


        const category = await CategoryModel.create({
            name
        })

        if(!category){
            return res.status(httpStatusCode.METHOD_NOT_ALLOWED).json({
                success: false,
                message: "something wrong in the creation of category"
            })
        }

        return res.status(httpStatusCode.CREATED).json({
            success: true,
            message: "You created Successfully !!",
            data: category
        })
    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong !!",
            error: error.message
        })
    }
}
const DeleteCategory = async (req, res) => {
    try {

        return res.status(httpStatusCode.OK).json({
            success: true,
            message: "You created Successfully !!",

        })
    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong !!",
            error: error.message
        })
    }
}

const ViewCategory= async (req,res)=>{
    try{
        const categoryList= await CategoryModel.find();
        if(!categoryList){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                success:false,
                message:"Somenthing wrong with database!!"
            })
        }

        return res.status(httpStatusCode.OK).json({
            success: true,
            message:"successfully viewed !!",
            data:categoryList 
        })
    }catch(error){
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            messgae:"Something went wrong !!",
            error: error.message
        })
    }
}

module.exports = {
    AddCategory,
    DeleteCategory,
    ViewCategory
}