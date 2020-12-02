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

const UserModel = mongoose.model('userschemas', UserSchema);

UserModel.getUserByEmail = (email)=> {
    return UserModel.findOne({
        email: email
    })
}
UserModel.getUserByUsername = (username)=> {
    return UserModel.findOne({
        email: username
    })
}


module.exports = UserModel;