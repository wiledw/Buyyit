const mongoose = require('mongoose');
const {Schema} = mongoose

const requestSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    buyerName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    itemDetails: {
        type: String,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    itemImage: String,
})


const requestModel = mongoose.model('request', requestSchema);

module.exports = requestModel;