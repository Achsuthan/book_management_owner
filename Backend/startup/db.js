const winston =  require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/DB123', {
            useCreateIndex: true,
            useNewUrlParser: true
        })
        .then(() => winston.info('connected to MongoDB...'))
        .catch(err => console.log("Unable to connect", err));
}