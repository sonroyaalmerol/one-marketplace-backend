//username - project password - marketplace
//mongodb+srv://project:<password>@cluster-project.y1tuk.mongodb.net/test

let proDB = "mongodb+srv://project:marketplace@cluster-project.y1tuk.mongodb.net/?retryWrites=true&w=majority";

const { MongoServerClosedError } = require('mongodb');
let mongoose = require('mongoose');

module.exports = function()
{
    MongoServerClosedError.connect(proDB);

    let marketDb = mongoose.connection;

    marketDb.on('eror' , console.error.bind(console, 'Connection Error:'));
    marketDb.once('open' ,() => 
    {
        console.log('Connected to MarketDb');
    });

    return marketDb;
}