//username - project password - marketplace
//mongodb+srv://project:<password>@cluster-project.y1tuk.mongodb.net/test

let proDB = "mongodb+srv://project:marketplace@cluster-project.y1tuk.mongodb.net/project?retryWrites=true&w=majority";

let mongoose = require('mongoose');

module.exports = function()
{
    mongoose.connect(proDB, {
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