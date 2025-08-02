const { v4: uuidv4 } = require("uuid");
const LiveClass = require("../models/LiveClass");

// Create class
exports.createClass = async (req, res) => {
    try {
        const { title, description, date, startTime, endTime, instructor } = req.body;
        
        // Generate a unique room name using UUID
        const roomName = uuidv4();

        // Construct the meeting link (you may change "http://localhost:5173/" to match your front-end route)
        const meetingLink = `http://localhost:5173/join/${roomName}`;

        const liveClass = new LiveClass({ title, description, date, startTime, endTime, instructor, meetingLink });
        await liveClass.save();
        res.status(200).json({
            success: true,
            data: liveClass,
            message: "New class created successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Failed to create live class.',
            message: err.message
        });
    }
};

// Get upcoming classes
exports.getClass = async (req, res) => {
    try {
        const now = new Date();
        const classes = await LiveClass.find({ date: { $gte: now } }).populate('instructor');
        res.status(200).json({
            success: true,
            message: "Class fetched successfully",
            classes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch classes.',
            message: err.message
        });
    }
};


// Get all live classes
exports.getAllLiveClasses = async (req, res) => {
  try {
    const liveClasses = await LiveClass.find().populate("instructor", "name email");
    res.json({ liveClasses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
