const mongoose = require('mongoose');
const {Schema} = mongoose
// schema template for academic listings
const academicSchema = new Schema({
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

const academicModel = mongoose.model('academic', academicSchema);


module.exports = academicModel;