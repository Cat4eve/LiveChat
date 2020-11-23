const isConnected = require('./mongoConnect');

if (isConnected) {
    const koa = require('koa');
    const { PORT } = require('../config.json');
    const UserModel = require('../Models/Schemes/userSchema.js');
    const Router = require('@koa/router');

    const app = new koa();
    const router = new Router();

    function createUser(username, email, password) {
        return UserModel.create({
            username: username,
            email: email,
            password: password,
            history: { }
        });
    }

    // app.use(function(ctx) {
    //     if (ctx.url == '/'){
    //         ctx.redirect('/login');
    //     }
    // });

    router.get('/', (ctx)=>{
        ctx.redirect('/login');
    });

    router.get('/login', (ctx)=>{
        ctx.body = ''
    });

    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen(PORT)
}