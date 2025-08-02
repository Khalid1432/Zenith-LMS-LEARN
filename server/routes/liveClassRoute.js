const express = require('express');
const router = express.Router();

const { createClass, getClass, getAllLiveClasses } = require('../controllers/liveClass');

// Create class
router.post('/create', createClass);
// Get upcoming classes
router.get('/upcoming', getClass);
router.get("/", getAllLiveClasses);


module.exports = router;
