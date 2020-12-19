const userModel = require('../Models/userModel');

class UserController {
    constructor(){ }

    async getUserByEmail(ctx, next) {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
        const result = await userModel.getUserByEmail(ctx.params.email);
        //if (!result) ctx.throw(500, 'User Not Found');
        ctx.body = result;
        ctx.status = 200;
    }

    async getUserByUsername(ctx, next) {
        const result = await userModel.getUserByUsername(ctx.params.username);
        if (!result) ctx.throw(500, 'User Not Found');
        ctx.body = result;
        ctx.status = 200;
    }

    async getUserById(ctx, next) {
        const result = await userModel.getUserById(ctx.params.id);
        if (!result) ctx.throw(500, 'User Not Found');
        ctx.body = result;
        ctx.status = 200;
    }

    async postRegistrationUser(ctx, next) {
        console.log('aa');
    }
}

module.exports = new UserController();
