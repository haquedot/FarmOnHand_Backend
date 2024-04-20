const mongoose=require('mongoose');

const FarmerSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'product'
        }
      ],
      role:{
        type:String,
        required: true,
      }
},{timestamps:true});

module.exports=mongoose.model('farmer',FarmerSchema);