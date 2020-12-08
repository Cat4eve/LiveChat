const isConnected = require('./mongoConnect');

if (isConnected) {
    const koa = require('koa');
    const { PORT } = require('./config.json');
    const userRouter = require('./Routes/userRouter')

    const app = new koa();

    app.use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        await next();
    })


    app.listen(PORT)
    app.use(userRouter.routes());
    app.use(userRouter.allowedMethods());
}