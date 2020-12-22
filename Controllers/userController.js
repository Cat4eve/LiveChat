const userModel = require('../Models/userModel');

class UserController {
    constructor(){ }

    async getUserByEmail(ctx, next) {
        let result = await userModel.getUserByEmail(ctx.params.email);
        if (!result) result = false;
        console.log(result)
        //if (!result) ctx.throw(500, 'User Not Found');
        ctx.body = result;
        ctx.status = 200;
        return result;
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
        let vars = ctx.request.body;
        let len = vars.password.length;
        vars.password = Buffer.alloc(len, vars.password).toString('base64');
        await userModel.addUser(vars, len);
        localStorage.setItem('email', vars.email)
    }
}

module.exports = new UserController();
