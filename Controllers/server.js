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
            history: {}
        });
    }

    app.use(function(req, res) {
        let user1 = createUser('aaa', 'bbb', 'ccc')
        console.log(user1);
      });
      

    app.listen(PORT)
}