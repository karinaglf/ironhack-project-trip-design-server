const express = require("express");
const userModel = require("../models/user.model");
const router = express.Router();
const User = require("../models/user.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware");


// GET /api/users/current  - Get current user info
router.get('/api/users/current', isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.
  
    const currentUser = req.payload;
    const user = await User.findById(currentUser._id).populate('createdTrips').populate('requestedTrips');

    const userInfo = {
      // We should never expose passwords publicly
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role, // 'admin' or 'user'
      image: user.image, 
      createdTrips: user.createdTrips,
      requestedTrips: user.requestedTrips
    };


    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
})

// PUT /api/users/current  - Update the current user
router.put('/api/users/current', isAuthenticated, async (req, res, next) => {
  try {
    // If the user is authenticated we can access the JWT payload via req.payload
    // req.payload holds the user info that was encoded in JWT during login.
  
    const currentUser = req.payload;
    const { email, name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      { email, name },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
})


module.exports = router;
