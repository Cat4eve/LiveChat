const mongoose = require('mongoose');
const { URL } = require('../config.json')

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
    });

mongoose.connection.on(`connected`, ()=> {
    module.exports = true;
})

mongoose.connection.on(`error`, ()=> {
    module.exports = false
})

