const express = require('express');
const router = express.Router();

const Room = require('../models/rooms');

// Route to get all rooms
router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (err) {
    return res.status(400).json({ message: 'Rooms not found' });
  }
});

// Route to get a room by ID (using req.body for POST request)
router.post("/getroombyid", async (req, res) => {
  const roomid = req.body.roomid;  // Corrected to use req.body.roomid

  try {
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
  } catch (err) {
    return res.status(400).json({ message: 'Room not found' });
  }
});

module.exports = router;
