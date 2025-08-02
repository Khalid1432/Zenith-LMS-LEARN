const mongoose = require("mongoose");

const LectureProgressSchema = new mongoose.Schema({
  lectureId: {
    type: String,
  },
  viewed: {
    type: Boolean
  },
  dateViewed: {
    type: Date
  },
});

const CourseProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  courseId: {
    type: String,
  },
  completed: {
    type: Boolean
  },
  completionDate: {
    type: Date
  },
  lecturesProgress: [LectureProgressSchema],
});

module.exports = mongoose.model("Progress", CourseProgressSchema);
