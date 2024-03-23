const mongoose=require('mongoose');

const OrderSchema= new mongoose.Schema({
    items: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'product',
                required: true
            },
            quantity: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports=mongoose.model('order',OrderSchema);