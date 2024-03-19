const { validationResult } = require("express-validator");
const httpStatusCode = require("../constant/httpStatusCode")
const { BillingAddressModel, ShippingAddressModel } = require('../models/addressModel');
const UserModel= require('../models/userModel');
const userModel = require("../models/userModel");
const AddBillingAddress = async(req, res) => {
    try {

        // Validate incoming request data
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                success: false,
                message: "Validation failed",
                errors: errors.array(),
            });
        }
        const { 
            firstname, 
            lastname, 
            companyname, 
            country, 
            street, 
            street1, 
            city,
            state,
            pincode,
            phone,
            email
        } = req.body;

        const BillingAddress=await BillingAddressModel.create({
            firstname, 
            lastname, 
            companyname, 
            country, 
            street,
            street1, 
            city,
            state,
            pincode,
            phone,
            email
        });
        if(!BillingAddress){
            return res.status(httpStatusCode.SERVICE_UNAVAILABLE).json({
                success: false,
                message:"Something went in the Billing Address Model!!"
            })
        }

        const user=req.user;
        const userId=user._id;
        const UpdateData= await userModel.findByIdAndUpdate(userId,{
            billingAddress:BillingAddress._id
        })
        
        console.log(UpdateData);
        if(!UpdateData){
            return res.status(httpStatusCode.NOT_FOUND).json({
                success:false,
                message:"Something went wrong in the User Model Updated data",
            })
        }

        return res.status(httpStatusCode.CREATED).json({
            success: true,
            message:"Successfully created!!",
            data:BillingAddress,
        })

    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:error.message,
        })
    }
}
const AddShippingAddress = async(req, res) => {
    try {
        // Validate incoming request data
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                success: false,
                message: "Validation failed",
                errors: errors.array(),
            });
        }
        const { 
            firstname, 
            lastname, 
            companyname, 
            country, 
            street, 
            street1, 
            city,
            state,
            pincode
        } = req.body;

        const ShippingAddress=await ShippingAddressModel.create({
            firstname, 
            lastname, 
            companyname, 
            country, 
            street,
            street1, 
            city,
            state,
            pincode
        });
        if(!ShippingAddress){
            return res.status(httpStatusCode.SERVICE_UNAVAILABLE).json({
                success: false,
                message:"Something went in the Shipping Address Model!!"
            })
        }
        const user=req.user;
        const userId=user._id;
        const UpdateData= await userModel.findByIdAndUpdate(userId,{
            shippingAddress:ShippingAddress._id
        })
        
        console.log(UpdateData);
        if(!UpdateData){
            return res.status(httpStatusCode.NOT_FOUND).json({
                success:false,
                message:"Something went wrong in the User Model Updated data",
            })
        }


        return res.status(httpStatusCode.CREATED).json({
            success: true,
            message:"Successfully created!!",
            data:ShippingAddress,
        })

    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong"
        })
    }
}


const ViewBillingAddress=async (req,res)=>{
    try{
        const userId= req.user._id;
        const user= await UserModel.findById(userId);
        console.log(user)
        if(!user){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                success:false,
                message:"SOmething went wrong in user model!!"
            })
        }
        const BillingAddress= await BillingAddressModel.findById(user.billingAddress)
        if(!BillingAddress){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                success: false,
                message:"Something went wrong in Billing Address!!"
            })
        }
        return res.status(httpStatusCode.OK).json({
            success: true,
            message:"Successfully Viewed Billing Address!!!",
            data :BillingAddress
        })
    }catch(error){
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:"Something went wrong !!!"
        })
    }
}
const ViewShippingAddress=async(req,res)=>{
    try{
        const userId= req.user._id;
        const user= await UserModel.findById(userId);
        console.log(user)
        if(!user){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                success:false,
                message:"SOmething went wrong in user model!!"
            })
        }
        const ShippingAddress= await ShippingAddressModel.findById(user.shippingAddress)
        if(!ShippingAddress){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                success: false,
                message:"Something went wrong in Billing Address!!"
            })
        }
        return res.status(httpStatusCode.OK).json({
            success: true,
            message:"Successfully Viewed Billing Address!!!",
            data :ShippingAddress
        })
    }catch(error){
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:"Something went wrong !!!"
        })
    }
}

module.exports = {
    AddBillingAddress,
    AddShippingAddress,
    ViewBillingAddress,
    ViewShippingAddress
}