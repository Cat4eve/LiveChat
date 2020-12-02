const userModel = require('../Models/userModel');

class UserController {
    constructor(){ }

    async getUserByEmail(ctx, next) {
        const result = await userModel.getUserByEmail(ctx.params.email);
        if (!result) ctx.throw(500, 'User Not Found');
        ctx.body = result;
        ctx.status = 200;
    }

    async getUserByUsername(ctx, next) {
        const result = await userModel.getUserByUsername(ctx.params.username);
        if (!result) ctx.throw(500, 'User Not Found');
        ctx.body = result;
        ctx.status = 200;
    }
}

module.exports = new UserController();
