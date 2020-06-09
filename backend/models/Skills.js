const mongoose = require("mongoose");
const schema = mongoose.Schema;

const skillSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  nbr: {
    type: Number,
  },
  source: {
    type: String,
  },
});

module.exports = Skills = mongoose.model("skill", skillSchema);
