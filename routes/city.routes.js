const express = require("express");
const router = express.Router();
const City = require("../models/city.model");
const mongoose = require('mongoose');

//
// GET /api/cities - Get all existing cities
router.get('/api/cities', async (req, res, next) => {
  try {
    const allCities = await City.find().populate('country');
    res.status(200).json(allCities);
  } catch (error) {
    res.status(500).json(error);
  }
})

// POST /api/cities - Create a new city
router.post('/api/cities', async (req, res, next) => {
    try {
      // Get the data from the request body
      const { name, country, description, img } = req.body;
  
      // Save the data in the db
      const createdCity = await City
      .create({ name, country, description, img })
      
      res.status(201).json(createdCity);  // 201 Created
  
    } catch (error) {
      res.status(500).json(error); // Internal Server Error
    }
})

// GET /api/cities/:cityId  - Get a specific city
router.get('/api/cities/:cityId', async (req, res, next) => {
  try {
    // Get the city id from the URL
    const { cityId } = req.params; 
    console.log(`cityId`, cityId); 

    if (!mongoose.Types.ObjectId.isValid(cityId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    // Make a DB query
    const oneCity = await City.findById(cityId).populate('country');

    // Send the response
    res.status(200).json(oneCity);
  } catch (error) {
    res.status(500).json(error);
  }
})

// PUT  /api/cities/:cityId  - Update a specific city
router.put('/api/cities/:cityId', async (req, res, next) => {
    try {
      // Get the city id
      const { cityId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(cityId)) {
        res.status(400).json({ message: "Invalid object id" });
        return;
      }    
  
      // Values to use for updating the city
      const { name, country, description, img } = req.body;
  
      const updatedCity = await City.findByIdAndUpdate(cityId, { name, country, description, img }, { new: true });
      
      res.status(200).json(updatedCity);
    } catch (error) {
      res.status(500).json(error);
    }
})

// DELETE /api/cities/:cityId  - Delete a specific city
  router.delete('/api/cities/:cityId', async (req, res, next) => {
    try {
      const { cityId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(cityId)) {
        res.status(400).json({ message: "Invalid object id" });
        return;
      }

      await City.findByIdAndDelete(cityId);
  
      res.status(204).send();  // No Content
    } catch (error) {
      res.status(500).json(error);
    }
  
})


module.exports = router;