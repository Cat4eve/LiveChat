const Router = require('@koa/router');
const userRouter = new Router();
const userController = require('../Controllers/userController');

userRouter.get('/users/email/:email', userController.getUserByEmail);
userRouter.get('/users/username/:username', userController.getUserByUsername);
userRouter.get('/users/id/:id', userController.getUserById);
userRouter.get('/users/emailandpassword', userController.compareEmailAndPassword);
userRouter.get('/users/all', userController.getAllUsers)
userRouter.post('/registration', userController.postRegistrationUser);
// userRouter.get('/register?username=')

module.exports = userRouter;