const Router = require('@koa/router');
const historyRouter = new Router();
const historyController = require('../Controllers/historyController');

historyRouter.get('/history/user/id/:id', historyController.getChatByUserId);
historyRouter.get('/history/chat/all/:orderedFor', historyController.getAllChats);
historyRouter.post('/history/chat', historyController.getChatByAllUsers)
historyRouter.post('/history/create', historyController.createChannel);
historyRouter.post('/history/add', historyController.addMsg);

module.exports = historyRouter