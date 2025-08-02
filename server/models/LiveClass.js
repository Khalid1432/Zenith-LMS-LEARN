const mongoose = require("mongoose");

const liveClassSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  startTime: String,
  endTime: String,
  meetingLink: String,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LiveClass", liveClassSchema);
