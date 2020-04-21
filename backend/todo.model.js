const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    Name: {
        type: String
    },
    Lastname: {
        type: String
    },
    Adress: {
        type: String
    },
    Skills: {
        type: String
    },
    level: {
        type: String
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('Todo', Todo);