const mongoose = require("mongoose");

const StudentCoursesSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  courses: [
    {
      courseId: {
        type: String,
      },
      title: {
        type: String,
      },
      instructorId: {
        type: String,
      },
      instructorName: {
        type: String,
      },
      dateOfPurchase: Date,
      courseImage: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("StudentCourses", StudentCoursesSchema);
