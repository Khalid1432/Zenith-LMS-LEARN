const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({

  title: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  public_id: {
    type: String,
  },
  freePreview: {
    type: Boolean,
  },
});

const CourseSchema = new mongoose.Schema({
  instructorId: {
    type: String,
  },
  instructorName: {
    type: String,
  },
  date: {
    type: Date,
  },
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  level: {
    type: String,
  },
  primaryLanguage: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  welcomeMessage: {
    type: String,
  },
  pricing: {
    type: Number,
  },
  objectives: {
    type: String,
  },
  students: [
    {
      studentId: {
        type: String,
      },
      studentName: {
        type: String,
      },
      studentEmail: {
        type: String,
      },
      paidAmount: {
        type: String,
      },
    },
  ],
  curriculum: [LectureSchema],
  isPublised: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
