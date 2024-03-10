const httpStatusCode = require("../constant/httpStatusCode")
const User=require('../models/userModel');
const Login=async(req,res)=>{
    try{}catch(error){
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:"something went wrong !!",
            error:error.message
        })
    }
}

module.exports={
    Login
}