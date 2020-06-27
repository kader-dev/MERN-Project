const express = require("express");
const router = express.Router();
const feedback = require('../models/feedback')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/pi-js";
//skills model
var _database;
var moment = require('moment');
const mail = require("../middleware/mailer");

module.exports = router;
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    console.log("Connected");
    _database = db;
});
router.post("/", (req, res) => {
    try {
        const newFeedBack = new feedback({
            mark: req.body.mark,
            Description: req.body.Description,
            feedBackOf: req.body.feedBackOf,
            session: req.body.idSession,
            First_name: req.body.First_name,
            Last_name: req.body.Last_name,

        });
        newFeedBack.save().then((item) => res.json(item));
    } catch (err) {
        next(err);
    }
});
router.get("/Check_feed_back", (req, res) => {
    var ObjectId = require('mongodb').ObjectID;
    var dbo = _database.db("pi-js");

    console.log("ahmed", req.query)
    dbo.collection('feedbacks').findOne({ $and: [{ 'feedBackOf': ObjectId(req.query.iduser) }, { 'session': ObjectId(req.query.sessionId) }] }, function (err, result) {
        if (err) { throw err };
        console.log(result, "hh")
        res.json(result);

    });

});

router.get("/oneSessionFeedBacks", (req, res) => {
    console.log("ahmed", req.body)
    var ObjectId = require('mongodb').ObjectID;
    var dbo = _database.db("pi-js");

    dbo.collection('feedbacks').find({ 'session': ObjectId(req.query.id) }).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);

    });
});
module.exports = router;
