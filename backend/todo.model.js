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
    Skills:[ {
        SkillName : {type: String},
        Level : {type: String}
    }],
});

module.exports = mongoose.model('Todo', Todo);