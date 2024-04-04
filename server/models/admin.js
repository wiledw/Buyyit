const mongoose = require('mongoose');
const {Schema} = mongoose

const adminSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
});

const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;
    