const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  orderStatus: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  paymentStatus: {
    type: String,
  },
  orderDate: Date,
  paymentId: {
    type: String,
  },
  payerId: {
    type: String,
  },
  instructorId: {
    type: String,
  },
  instructorName: {
    type: String,
  },
  courseImage: {
    type: String,
  },
  courseTitle: {
    type: String,
  },
  courseId: {
    type: String,
  },
  coursePricing: {
    type: String,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
