const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide naam"],
    trim: true,
    maxlength: [20, "Name cannot have more characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "must provide userID"],
  },
});

module.exports = mongoose.model("Task", TaskSchema);
