const isConnected = require('./mongoConnect');

if (isConnected) {
    const koa = require('koa');
    const { PORT } = require('../config.json');
    const UserModel = require('../Models/Schemes/userSchema.js');

    const app = new koa();

    function createUser(username, email, password) {
        return UserModel.create({
            username: username,
            email: email,
            password: password,
            history: { }
        });
    }

    function getUserFromEmail(email) {
        UserModel.findOne({
            email: email
        })
        .then((result) => {
            return result;
        });
    }

    function getUserFromUsername(username) {
        UserModel.findOne({
            username: username
        })
        .then((result) => {
            return result;
        });
    }

    function getUserFromUserId(id) {
        UserModel.findById(id)
        .then((result) => {
            return result;
        }) 
    }

    // function getUser(user) {
    //     UserModel.find({
    //         username: user.username || '',
    //         email: user.email || '',
    //         id: user.id || ''
    //     })
    //     .then((result) => {
    //         return result;
    //     })
    // }

    app.listen(PORT)
}