const Router = require('@koa/router');
const userRouter = new Router();
const userController = require('../Controllers/userController');

userRouter.get('/users/email/:email', userController.getUserByEmail);

// userRouter.get('/users', ()=>{console.log('user connects');})

module.exports = userRouter;