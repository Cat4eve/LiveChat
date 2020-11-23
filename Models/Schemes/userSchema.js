const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    history: {
        required: false,
        type: Object
    }
});

const UserModel = mongoose.model('UserSchema', UserSchema);


module.exports = UserModel;