const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    cartItems: [
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
}, { timestamps: true });

module.exports = mongoose.model('cart', CartSchema);
