const mongoose = require('mongoose');
const {Schema} = mongoose

const offerSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    sellerName: {
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

const offerModel = mongoose.model('offer', offerSchema);


module.exports = offerModel;