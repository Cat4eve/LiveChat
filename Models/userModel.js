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
    try {
        return UserModel.findOne({
            email: email
        })
    } catch (e) {
        return false
    }
    
}
UserModel.getUserByUsername = (username)=> {
    return UserModel.findOne({
        username: username
    })
}

UserModel.getUserById = (id)=> {
    return UserModel.findById(id)
}

module.exports = UserModel;