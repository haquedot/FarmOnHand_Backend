const jwt= require('jsonwebtoken');
const httpStatusCode = require('../constant/httpStatusCode');
require('dotenv').config();
const {JWT_SECRET}=process.env;

const GetToken=async (user)=>{
    const token= await jwt.sign({user},JWT_SECRET,{expiresIn:'1d'});
    return token;
}

const VerifyToken=(req,res,next)=>{
    const token= req.headers.authorization;
    if(!token){
        return res.status(httpStatusCode.UNAUTHORIZED).json({
            success:false,
            message:"Unauthorized: Token not provided"
        })
    }

    try{

        const decoded= jwt.verify(token,JWT_SECRET);
        req.user=decoded.user;
        console.log(req.user);
        next();
    }catch(error){
        return res.status(httpStatusCode.UNAUTHORIZED).json({
            success: false,
            message:"Unauthorized: Invalid token"
        })
    }
}


module.exports={
    GetToken,
    VerifyToken
}