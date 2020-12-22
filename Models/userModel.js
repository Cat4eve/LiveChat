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
    passwordLength: {
        required: false,
        type: Number
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
    });
}
UserModel.getUserByUsername = (username)=> {
    return UserModel.findOne({
        username: username
    })
}

UserModel.getUserById = (id)=> {
    return UserModel.findById(id)
}

UserModel.addUser = (userObject, len)=> {
    let user = new UserModel({username: userObject.username, email: userObject.email, password: userObject.password, passwordLength: len, history: []});
    user.save();
}

module.exports = UserModel;