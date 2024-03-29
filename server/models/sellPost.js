const mongoose = require('mongoose');
const {Schema} = mongoose

const sellPostSchema = new Schema({
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

const sellPostModel = mongoose.model('sellPost', sellPostSchema);


module.exports = sellPostModel;