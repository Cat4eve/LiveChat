const Router = require('@koa/router');
const userRouter = new Router();
const userController = require('../Controllers/userController');
let koaBody = require('koa-body');


userRouter.get('/users/email/:email', userController.getUserByEmail);
userRouter.get('/users/username/:username', userController.getUserByUsername)
userRouter.get('/users/id/:id', userController.getUserById)
userRouter.get('/users/emailandpassword', userController.compareEmailAndPassword)
userRouter.post('/registration', koaBody(), userController.postRegistrationUser);
// userRouter.get('/register?username=')
// userRouter.get('/users', ()=>{console.log('user connects');})

module.exports = userRouter;