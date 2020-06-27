const mongoose = require("mongoose");
const schema = mongoose.Schema;
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const feedbackSchema = new schema({
    Description: {
        type: String,
        required: true,
    },
    mark: {
        type: Number,
    },
    feedBackOf: {
        type: ObjectId
    },
    session: {
        type: ObjectId
    },
    First_name: {
        type: String,
    },
    Last_name: {
        type: String,
    },






    /*    list_of_participant: [{
           participant: {
               type: Object
           }
       }], */
});

module.exports = training = mongoose.model("feedback", feedbackSchema);
