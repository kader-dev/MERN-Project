const mongoose = require("mongoose");
const schema = mongoose.Schema;

const trainSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Trainer = mongoose.model("trainers", trainSchema);
