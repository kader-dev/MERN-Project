const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Train = new Schema({
    Subject: {
        type: String
    },
    TrainerName: {
        type: String
    },
    Start: {
        type: String
    },
    End: {
        type: String
    }
});

module.exports = mongoose.model('Train', Train);