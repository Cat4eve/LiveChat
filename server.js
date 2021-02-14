const isConnected = require('./mongoConnect');
if (!isConnected) throw new Error('db is not connected')

const koa = require('koa');
// const { PORT } = require('./config.json');
const userRouter = require('./Routes/userRouter');
const historyRouter = require('./Routes/historyRouter');
const koaBody = require('koa-body');


const app = new koa();
const server = require('http').createServer(app.callback());
const Router = require('@koa/router');
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

let router = new Router();
app.use(koaBody());
app.use(router.routes());
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    try {
      console.log(ctx);
      await next();
    }
    catch(err) {
      if (err.name == 'MongoError' && err.code == 11000) {
        ctx.status = 200;
        ctx.body = {error: 'Dublication Error', code: 11000};
        return;
      }
      ctx.status = err.status || 500;
      ctx.body = { error: err.message || err };
      ctx.app.emit('error', err, ctx); 
    }
})

io.on('connection', socket=> {
  socket.emit('greet-event', socket.id);
})

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.use(historyRouter.routes());
app.use(historyRouter.allowedMethods());
server.listen(3000, ()=>{console.log('Server is online!')})
