const express = require("express");
const router = express.Router();
const Experience = require("../models/experience.model");
const City = require("../models/city.model");
const mongoose = require('mongoose');

// Change this
// GET /api/experiences - Get all existing experiences
router.get('/api/experiences', async (req, res, next) => {
  try {
    const allExperiences = await Experience.find();
    res.status(200).json(allExperiences);
  } catch (error) {
    res.status(500).json(error);
  }
})

// POST /api/experiences - Create a new experience
router.post('/api/experiences', async (req, res, next) => {
    try {
      // Get the data from the request body
      const {name, description, img, category, externalUrl, affiliateUrl, cityId } = req.body;
  
      // Save the data in the db
      const createdExperience = await Experience
      .create({name, description, img, category, externalUrl, affiliateUrl, city: cityId })
      
      // Update city where the experience happens
      await City.findByIdAndUpdate(cityId, { $push: { experiences: createdExperience._id } });
      
      res.status(201).json(createdExperience);  // 201 Created
  
    } catch (error) {
      res.status(500).json(error); // Internal Server Error
    }
})

// GET /api/experiences/:experienceId  - Get a specific experience
router.get('/api/experiences/:experienceId', async (req, res, next) => {
  try {
    // Get the trip id from the URL
    const { experienceId } = req.params;  //   in Express `:` means `req.params`
    console.log(`experienceId`, experienceId); 

    if (!mongoose.Types.ObjectId.isValid(experienceId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    // Make a DB query
    const oneExperience = await Experience.findById(experienceId);

    // Send the response
    res.status(200).json(oneExperience);
  } catch (error) {
    res.status(500).json(error);
  }
})

// PUT  /api/experiences/:experienceId  - Update a specific experience
router.put('/api/experiences/:experienceId', async (req, res, next) => {
    try {
      // Get the experience id
      const { experienceId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(experienceId)) {
        res.status(400).json({ message: "Invalid object id" });
        return;
      }    
  
      // Values to use for updating the trip
      const {name, description, img, category, externalUrl, affiliateUrl } = req.body;
  
      const updatedExperience = await Experience.findByIdAndUpdate(experienceId, {name, description, img, category, externalUrl, affiliateUrl }, { new: true });
      
      res.status(200).json(updatedExperience);
    } catch (error) {
      res.status(500).json(error);
    }
})

// DELETE /api/experiences/:experienceId  - Delete a specific experience
  router.delete('/api/experiences/:experienceId', async (req, res, next) => {
    try {
      const { experienceId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(experienceId)) {
        res.status(400).json({ message: "Invalid object id" });
        return;
      }

      // const foundedTrip= await Trips.findById(tripId).populate('createdBy')
      // console.log(`foundedTrip to be DELETED`, foundedTrip)

      // // Update user who created the trip
      // const creatorUser = await User.findById(foundedTrip.createdBy)
      // const updatedCreatorUser = await User.findByIdAndUpdate(foundedTrip.createdBy, { $pull: { createdTrips: foundedTrip._id } });

      await Experience.findByIdAndDelete(experienceId);
  
      res.status(204).send();  // No Content
    } catch (error) {
      res.status(500).json(error);
    }
  
})


module.exports = router;
