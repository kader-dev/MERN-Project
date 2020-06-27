const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/pi-js', {
    useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
})


/* var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var database;

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    database = db.db("pi");
    console.log("Connected!");
});


 */