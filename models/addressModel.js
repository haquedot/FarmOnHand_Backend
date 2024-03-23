const mongoose = require('mongoose');
const BillingAddressSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    companyname: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        default: 'India',
    },
    street: {
        type: String,
        required: true,
    },
    street1:{
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    }
},{timestamps: true})
const ShippingAddressSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    companyname: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        default: 'India',
    },
    street: {
        type: String,
        required: true,
    },
    street1: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    }
},{timestamps: true})

const BillingAddressModel = mongoose.model('billingAddress', BillingAddressSchema);
const ShippingAddressModel = mongoose.model('shippingAddress', ShippingAddressSchema);

module.exports = {
    BillingAddressModel,
    ShippingAddressModel
}
