const httpStatusCode = require("../constant/httpStatusCode")

const AddOrder=async (req,res)=>{
    try{
        
    }catch(error){
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:"Some thing went wrong!!",
            error:error.message
        })
    }
}