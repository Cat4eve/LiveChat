const isConnected = require('./mongoConnect');
if (!isConnected) throw new Error('db is not connected')

const koa = require('koa');
const { PORT } = require('./config.json');
const userRouter = require('./Routes/userRouter')

const app = new koa();
const io = require('socket.io')(app)

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
})

io.on('connection', socket=> {
    socket.emit('greet-event', 'Hello');
})

app.listen(PORT)
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());