const express = require('express');
const router = express.Router();
const User = require('../models/users'); // Assuming you have a User model


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      res.send(user);
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get('/getallusers', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
});



module.exports = router;