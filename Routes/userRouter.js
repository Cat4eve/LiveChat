const Router = require('@koa/router');
const userRouter = new Router();
const userController = require('../Controllers/userController');



userRouter.get('/users/email/:email', userController.getUserByEmail);
userRouter.get('/users/username/:username', userController.getUserByUsername)
userRouter.get('/users/id/:id', userController.getUserById)
userRouter.post(url='/registration', userController.postRegistrationUser);
// userRouter.get('/register?username=')
// userRouter.get('/users', ()=>{console.log('user connects');})

module.exports = userRouter;