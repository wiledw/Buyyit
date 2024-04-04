const mongoose = require('mongoose');
const {Schema} = mongoose
// schema template for general user accounts
const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;