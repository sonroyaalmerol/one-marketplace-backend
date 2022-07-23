//username - project password - marketplace
//mongodb+srv://project:<password>@cluster-project.y1tuk.mongodb.net/test
const config = require('./config');

const mongoose = require('mongoose');

module.exports = function()
{
    mongoose.connect(config.ATLASDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    let marketDb = mongoose.connection;

    marketDb.on('error' , console.error.bind(console, 'Connection Error:'));
    marketDb.once('open' ,() => 
    {
        console.log('Connected to MarketDb');
    });

    return marketDb;
}