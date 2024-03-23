const httpStatusCode = require("../constant/httpStatusCode")

const Order=async (req,res)=>{
    try{
        const {}=req.body;
        return res.status(httpStatusCode.CREATED).json({
            success:true,
            message:"Your order is placed",
            data:'order'
        })
    }catch(error){
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:"Something went wrong!!",
            error:error.message
        })
    }
};

module.exports={
    Order
}