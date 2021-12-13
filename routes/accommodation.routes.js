const express = require("express");
const router = express.Router();
const Accommodation = require("../models/accommodation.model");
const City = require("../models/city.model");
const mongoose = require('mongoose');

// GET /api/accommodations - Get all existing accommodations
router.get('/api/accommodations', async (req, res, next) => {
  try {
    const allAccommodations = await Accommodation.find();
    res.status(200).json(allAccommodations);
  } catch (error) {
    res.status(500).json(error);
  }
})

// POST /api/accommodations - Create a new accommodation
router.post('/api/accommodations', async (req, res, next) => {
    try {
      // Get the data from the request body
      const {name, description, img, category, externalUrl, affiliateUrl, cityId } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(cityId)) {
        res.status(400).json({ message: "Invalid object id" });
        return;
      }
      
      // Save the data in the db
      const createdAccommodation = await Accommodation
      .create({name, description, img, category, externalUrl, affiliateUrl, city: cityId })
      
      // Update city where the accommodation is located
      await City.findByIdAndUpdate(cityId, { $push: { accommodations: createdAccommodation._id } });
      
      res.status(201).json(createdAccommodation);  // 201 Created
      
    } catch (error) {
      res.status(500).json(error); // Internal Server Error
    }
})

// GET /api/accommodations/:accommodationId  - Get a specific accommodation
router.get('/api/accommodations/:accommodationId', async (req, res, next) => {
  try {
    // Get the trip id from the URL
    const { accommodationId } = req.params;  //   in Express `:` means `req.params`
    console.log(`accommodationId`, accommodationId); 

    if (!mongoose.Types.ObjectId.isValid(accommodationId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    // Make a DB query
    const oneAccommodation = await Accommodation.findById(accommodationId);

    // Send the response
    res.status(200).json(oneAccommodation);
  } catch (error) {
    res.status(500).json(error);
  }
})

// PUT  /api/accommodations/:accommodationId  - Update a specific accommodation
router.put('/api/accommodations/:accommodationId', async (req, res, next) => {
    try {
      // Get the accommodation id
      const { accommodationId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(accommodationId)) {
        res.status(400).json({ message: "Invalid object id" });
        return;
      }    
  
      // Values to use for updating the trip
      const {name, description, img, category, externalUrl, affiliateUrl } = req.body;
  
      const updatedAccommodation = await Accommodation.findByIdAndUpdate(accommodationId, {name, description, img, category, externalUrl, affiliateUrl }, { new: true });
      
      res.status(200).json(updatedAccommodation);
    } catch (error) {
      res.status(500).json(error);
    }
})

// DELETE /api/accommodations/:accommodationId  - Delete a specific accommodation
  router.delete('/api/accommodations/:accommodationId', async (req, res, next) => {
    try {
      const { accommodationId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(accommodationId)) {
        res.status(400).json({ message: "Invalid object id" });
        return;
      }

      // const foundedTrip= await Trips.findById(tripId).populate('createdBy')
      // console.log(`foundedTrip to be DELETED`, foundedTrip)

      // // Update user who created the trip
      // const creatorUser = await User.findById(foundedTrip.createdBy)
      // const updatedCreatorUser = await User.findByIdAndUpdate(foundedTrip.createdBy, { $pull: { createdTrips: foundedTrip._id } });

      await Accommodation.findByIdAndDelete(accommodationId);
  
      res.status(204).send();  // No Content
    } catch (error) {
      res.status(500).json(error);
    }
  
})


module.exports = router;
