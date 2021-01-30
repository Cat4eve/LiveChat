const UserModel = require('../Models/userModel');
const userModel = require('../Models/userModel');
const userRouter = require('../Routes/userRouter');

class UserController {
    constructor(){ }

    async getUserByEmail(ctx, next) {
        let result = await userModel.getUserByEmail(ctx.params.email);
        if (!result) result = false;
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

    async compareEmailAndPassword(ctx, next) {
        const info = ctx.request.query;
        let result = await userModel.compareEmailAndPassword(info.email, Buffer.alloc(info.password.length, info.password).toString('base64'));
        if (!result) result = false;
        ctx.status = 200;
        ctx.body = result;
    }

    async getAllUsers(ctx, next) {
        let result = await UserModel.getAllUsers();
        if (!result) result = false;
        ctx.status = 200;
        ctx.body = result;
    }

    async postRegistrationUser(ctx, next) {
        let vars = ctx.request.body;
        let len = vars.password.length;
        vars.password = Buffer.alloc(len, vars.password).toString('base64');
        let user = await userModel.addUser(vars, len);
        console.log(user);
        ctx.status = 200;
        ctx.body = user;
        // ctx.status = 200;
        // ctx.body = {error: 'Dublication error'};
    }
}

module.exports = new UserController();
