const HistoryModel = require('../Models/historyModel');
// const userRouter = require('../Routes/userRouter');
const socket = {};

class HistoryController {
    constructor(){}

    async getChatByUserId(ctx, next) {
        let result = await HistoryModel.getChatByUserId(ctx.params.id);
        if (!result) ctx.throw(500, 'User Not Found');
        ctx.body = result;
        ctx.status = 200;
    }

    async getAllChats(ctx, next) {
        let result = await HistoryModel.getAllChats(ctx.params.orderedFor);
        if (!result) result = false;
        ctx.status = 200;
        ctx.body = result;
    }

    async createChannel(ctx, next) {
        let vars = ctx.request.body;
        let result = await HistoryModel.createChannel(vars.users);
        console.log(result, 'smth');
        if (!result) result = false;
        ctx.status = 200;
        ctx.body = result;
    }

    async addMsg(ctx, next) {
        let vars = ctx.request.body;
        let result = await HistoryModel.addMsg(vars.channelId, vars.author, vars.message);
        if (!result) result = false;
        ctx.status = 200;
        ctx.body = result;
    }
}

module.exports = new HistoryController();