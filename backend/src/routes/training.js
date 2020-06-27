const express = require("express");
const router = express.Router();
const training = require('../models/training')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/pi-js";
//skills model
var _database;
var moment = require('moment');
const mail = require("../middleware/mailer");

const skill = require("../models/training");

// @route GET api/skills
// Get all skills
/* app.get("/post/checker", function (req, res) {
    var dbo = _database.db("geeks");
    console.log(req.query);
    let user = req.query.id;
    let post = req.query.post;
    getlikebypostanduser(user, post, function (result) {
        console.log(result);
        res.json(result);

    })

});
 */
//FUNCTION
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    console.log("Connected");
    _database = db;
});

function getlikebypostanduser(user, post, cb) {
    var dbo = _database.db("geeks");

    var query = { $and: [{ "user": user }, { "post": post }] };

    dbo.collection("postracts").find(query).toArray(function (err, result) {
        if (err) throw err;
        cb(result);
    });
}
router.get("/", (req, res) => {
    console.log("ahmed", req.body)
    var ObjectId = require('mongodb').ObjectID;
    var dbo = _database.db("pi-js");

    training
        .find()
        .then((trainings) => res.json(trainings));
});
router.get("/one_Session", (req, res) => {
    console.log("ahmed", req.body)
    var ObjectId = require('mongodb').ObjectID;
    var dbo = _database.db("pi-js");

    dbo.collection('trainings').findOne({ '_id': ObjectId(req.query.id) }, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});
router.delete("/", (req, res) => {
    console.log("ahmed", req.body)
    var ObjectId = require('mongodb').ObjectID;
    var dbo = _database.db("pi-js");

    dbo.collection('trainings').deleteOne({ '_id': ObjectId(req.query.id) }, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});
router.get("/filterTraining", (req, res) => {
    console.log("ahmed", req.body)
    var dbo = _database.db("pi-js");
    if (req.query.category != null && req.query.skill != null && req.query.priority != null)

        dbo.collection('trainings').find({ $and: [{ 'category': req.query.category }, { 'Skill': req.query.skill }, { 'Priority': req.query.Priority }] })
            .toArray(function (err, result) {
                if (err) throw err;
                res.json(result);

            });
    if (req.query.category != null && req.query.skill != null && req.query.priority == null)

        dbo.collection('trainings').find({ $and: [{ 'category': req.query.category }, { 'Skill': req.query.skill }] })
            .toArray(function (err, result) {
                if (err) throw err;
                res.json(result);

            });
    if (req.query.category != null && req.query.skill == null && req.query.priority != null)

        dbo.collection('trainings').find({ $and: [{ 'category': req.query.category }, { 'Priority': req.query.Priority }] })
            .toArray(function (err, result) {
                if (err) throw err;
                res.json(result);

            });
    if (req.query.category != null && req.query.skill == null && req.query.priority == null)

        dbo.collection('trainings').find({ 'category': req.query.category })
            .toArray(function (err, result) {
                if (err) throw err;
                res.json(result);

            });
    if (req.query.category !== null && req.query.skill == null && req.query.priority != null)

        dbo.collection('trainings').find({ 'Priority': req.query.Priority })
            .toArray(function (err, result) {
                if (err) throw err;
                res.json(result);

            });
});

// @route post api/skills
// post a skill
router.post("/", (req, res) => {
    try {
        console.log("ahmed", req.body)
        const newTraining = new training({
            Skill: req.body.Skill,
            dateOfSession: req.body.dateOfSession,
            priority: req.body.priority,
            NumberOfPlaces: req.body.NumberOfPlaces,
            category: req.body.category,
            TrainerName: req.body.TrainerName,
            trainerLinkedin: req.body.trainerLinkedin,
            Description: req.body.Description,
            createdBy: req.body.createdBy
        });
        newTraining.save().then((item) => res.json(item));
    } catch (err) {
        next(err);
    }
});
router.put("/", (req, res) => {
    var ObjectId = require('mongodb').ObjectID;
    var dbo = _database.db("pi-js");
    console.log(req.body)
    dbo.collection('trainings').findOne({ '_id': ObjectId(req.body.id) }, async function (err, result) {
        if (err) throw err;

        const newTraining = new training({
            _id: req.body.id,
            Skill: req.body.Skill,
            dateOfSession: moment(req.body.dateOfSession).format("L"),
            priority: req.body.priority,
            NumberOfPlaces: req.body.NumberOfPlaces,
            category: req.body.category,
            TrainerName: req.body.TrainerName,
            trainerLinkedin: req.body.trainerLinkedin,
            Description: req.body.Description,
            confirmed: req.body.confirmed
        });
        training.updateOne({ "_id": ObjectId(req.body.id) }, { $set: newTraining }, function (err, result2) {
            if (err) throw err;
            console.log(result2, "gg")
            if (moment(moment(result.dateOfSession).format()).isSame(moment(req.body.dateOfSession).add("1", "hour").format()))

                res.end();
            else {
                dbo.collection('trainings').aggregate([
                    { '$match': { '_id': ObjectId(req.body.id) } },
                    {
                        $lookup:
                        {
                            from: 'users',
                            localField: 'list_of_participant.users',
                            foreignField: '_id',
                            as: 'participantslist'
                        }
                    }
                ]).toArray(function (err, result) {
                    console.log(result[0])
                    result[0].participantslist.forEach(element => {
                        console.log("hi")
                        mail(element.email, req.body.Skill, req.body.TrainerName, req.body.dateOfSession, moment(result.dateOfSession).format("YYYY-MM-DD"), moment(req.body.dateOfSession).format("YYYY-MM-DD")).catch(console.error);
                    });
                    res.end();
                });
                /*   console.log("mahouc nafso")
                  let email = "shang.tsung056@gmail.com"
                  mail(email, req.body.Skill, req.body.TrainerName, req.body.dateOfSession, moment(result.dateOfSession).format("YYYY-MM-DD"), moment(req.body.dateOfSession).format("YYYY-MM-DD")).catch(console.error);
                  res.end(); */

            }
        });
    });
});
router.put("/add_participant", (req, res) => {
    var ObjectId = require('mongodb').ObjectID;
    var dbo = _database.db("pi-js");

    console.log("ahmed", req.body)
    dbo.collection('trainings').updateOne({ '_id': ObjectId(req.body.id) }, { $push: { 'list_of_participant': { 'users': ObjectId(req.body.iduser) } } }, function (err, result) {
        if (err) { throw err };
        console.log(result)
        res.end();

    });


});
router.get("/check_if_participated/", (req, res) => {
    var ObjectId = require('mongodb').ObjectID;
    var dbo = _database.db("pi-js");

    dbo.collection('trainings').findOne({ $and: [{ 'list_of_participant': { 'users': ObjectId(req.query.iduser) } }, { '_id': ObjectId(req.query.id) }] }, function (err, result) {
        if (err) { throw err };
        res.json(result);

    });


});
router.put("/confirm/", (req, res) => {
    var ObjectId = require('mongodb').ObjectID;
    var dbo = _database.db("pi-js");

    dbo.collection('trainings').updateOne({ '_id': ObjectId(req.body.id) }, { $set: { 'confirmed': true } }, function (err, result) {
        if (err) { throw err };
        res.json(result);

    });


});

// @route delete api/skills
// delete a skill
router.delete("/:id", (req, res) => {
    skill
        .findById(req.params.id)
        .then((skill) => skill.remove().then(() => res.json({ success: true })))
        .catch((err) => res.status(404).json({ success: false }));
});


router.get("/test/", function (req, res) {
    var ObjectId = require('mongodb').ObjectID;
    var dbo = _database.db("pi-js");
    console.log(req.query.id)
    let ideven = req.query.id;

    //console.log(user);
    dbo.collection('trainings').aggregate([
        { '$match': { '_id': ObjectId(ideven) } },
        {
            $lookup:
            {
                from: 'users',
                localField: 'list_of_participant.users',
                foreignField: '_id',
                as: 'participantslist'
            }
        }
    ]).toArray(function (err, result) {
        console.log(result)
        res.json(result);
    });
});
module.exports = router;
