const mongoose = require("mongoose");
const schema = mongoose.Schema;
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const TrainingSchema = new schema({
    Skill: {
        type: String,
        required: true,
    },
    dateOfSession: {
        type: Date,
    },
    NumberOfPlaces: {
        type: Number,
    },
    priority: {
        type: String,
    },
    TrainerName: {
        type: String,
    },
    trainerLinkedin: {
        type: String,
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        required: true,
    },
    createdBy: {
        type: ObjectId
    },


    Description: {
        type: String
    }
    /*    list_of_participant: [{
           participant: {
               type: Object
           }
       }], */
});

module.exports = training = mongoose.model("training", TrainingSchema);
