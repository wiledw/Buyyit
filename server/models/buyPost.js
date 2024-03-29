const mongoose = require('mongoose');
const {Schema} = mongoose

const buyPostSchema = new Schema({
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


const buyPostModel = mongoose.model('buyPost', buyPostSchema);


module.exports = buyPostModel;