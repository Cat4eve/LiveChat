const mongoose = require('mongoose');
const { MongoURL } = require('./config.json')

mongoose.connect(MongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
    });

mongoose.connection.on(`connected`, ()=> {
    module.exports = true;
});

mongoose.connection.on(`error`, ()=> {
    module.exports = false
});

