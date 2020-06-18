const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Skill = new Schema({
    Name: {
      type: String
    },
    Priority: {
      type: String
  },
});

module.exports = mongoose.model('Skill', Skill);