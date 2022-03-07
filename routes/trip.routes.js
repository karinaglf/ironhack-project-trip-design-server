const express = require("express");
const router = express.Router();
const Trips = require("../models/trip.model");
const User = require("../models/user.model");
const Request = require("../models/request.model");
const mongoose = require('mongoose');

// GET /api/trips - Get all existing trips
router.get('/api/trips', async (req, res, next) => {
  try {
    const allTrips = await Trips.find()

    res.status(200).json(allTrips);
  } catch (error) {
    res.status(500).json(error);
  }
})

// POST /api/trips - Create a new trip
router.post('/api/trips', async (req, res, next) => {
    try {
      // Get the data from the request body
      const {
        tripName,
        coverImg,
        createdBy,
        request,
        startDate,
        endDate,
        duration,
        pax,
        coverMsg,
        destination,
        days
      } = req.body;

      // Save the data in the db
      const createdTrip = await Trips
      .create({
        tripName,
        coverImg,
        createdBy,
        request,
        startDate,
        endDate,
        duration,
        pax,
        coverMsg,
        destination,
        days,
      })
      
      res.status(201).json(createdTrip);  // 201 Created

      // Update user who created the trip
      await User.findByIdAndUpdate(createdBy, { $push: { createdTrips: createdTrip._id } });

      const foundedUser = await User.findById(createdBy).populate('createdTrips');
      console.log(`foundedUser in Trips Routes`, foundedUser)

      // Update the trip request
      await Request.findByIdAndUpdate(request, { tripPlan: createdTrip._id, status: 'draft' });

      const foundedRequest = await Request.findById(request).populate('tripPlan');
      console.log(`foundedRequest in Trips Routes`, foundedRequest)      
  
    } catch (error) {
      res.status(500).json(error); // Internal Server Error
    }
})

// GET /api/trips/:tripId  - Get a specific trip
router.get('/api/trips/:tripId', async (req, res, next) => {
  try {
    // Get the trip id from the URL
    const { tripId } = req.params;  //   in Express `:` means `req.params`
    console.log(`tripId`, tripId); 

    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    // Make a DB query
    const oneTrip = await Trips
      .findById(tripId)
      .populate('destination.city')
      .populate('destination.accommodations')
      .populate('days.experiences')

    // Send the response
    res.status(200).json(oneTrip);
  } catch (error) {
    res.status(500).json(error);
  }
})

// PUT  /api/trips/:tripId  - Update a specific trip
router.put('/api/trips/:tripId', async (req, res, next) => {
    try {
      // Get the trip id
      const { tripId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(tripId)) {
        res.status(400).json({ message: "Invalid object id" });
        return;
      }    
  
      // Values to use for updating the trip
      const { tripName, coverImg, createdBy, requestedBy } = req.body;
  
      const updatedTrip = await Trips.findByIdAndUpdate(tripId, { tripName, coverImg, createdBy, request }, { new: true });
      
      res.status(200).json(updatedTrip);
    } catch (error) {
      res.status(500).json(error);
    }
})

// DELETE /api/trips/:tripId  - Delete a specific trip
  router.delete('/api/trips/:tripId', async (req, res, next) => {
    try {
      const { tripId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(tripId)) {
        res.status(400).json({ message: "Invalid object id" });
        return;
      }

      const foundedTrip= await Trips.findById(tripId).populate('createdBy')
      console.log(`foundedTrip to be DELETED`, foundedTrip)

      // Update user who created the trip
      const creatorUser = await User.findById(foundedTrip.createdBy)
      const updatedCreatorUser = await User.findByIdAndUpdate(foundedTrip.createdBy, { $pull: { createdTrips: foundedTrip._id } });

      await Trips.findByIdAndDelete(tripId);
  
      res.status(204).send();  // No Content
    } catch (error) {
      res.status(500).json(error);
    }
  
})


module.exports = router;