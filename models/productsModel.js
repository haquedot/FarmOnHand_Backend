const mongoose= require('mongoose');

const ProductSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true,
    },
    productImage:{
        type: String,
        required: true,
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    stock:{
        type: String,
        required: true
    }
},{timestamps: true});


module.exports= mongoose.model('product',ProductSchema);