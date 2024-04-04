const mongoose = require('mongoose');
const {Schema} = mongoose
// schema template for admin emails
const adminSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
});

const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;
    