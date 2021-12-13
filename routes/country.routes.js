const express = require("express");
const router = express.Router();
const Country = require("../models/country.model");
const mongoose = require('mongoose');

// GET /api/countries - Get all existing countries
router.get('/api/countries', async (req, res, next) => {
  try {
    const allCountries = await Country.find();
    res.status(200).json(allCountries);
  } catch (error) {
    res.status(500).json(error);
  }
})

// POST /api/countries - Create a new country
router.post('/api/countries', async (req, res, next) => {
    try {
      // Get the data from the request body
      const { name, code } = req.body;
  
      // Save the data in the db
      const createdCountry = await Country
      .create({ name, code })
      
      res.status(201).json(createdCountry);  // 201 Created
  
    } catch (error) {
      res.status(500).json(error); // Internal Server Error
    }
})

// GET /api/countries/:countryId  - Get a specific country
router.get('/api/countries/:countryId', async (req, res, next) => {
  try {
    // Get the country id from the URL
    const { countryId } = req.params; 
    console.log(`countryId`, countryId); 

    if (!mongoose.Types.ObjectId.isValid(countryId)) {
      res.status(400).json({ message: "Invalid object id" });
      return;
    }

    // Make a DB query
    const oneCountry = await Country.findById(countryId);

    // Send the response
    res.status(200).json(oneCountry);
  } catch (error) {
    res.status(500).json(error);
  }
})

// PUT  /api/countries/:countryId  - Update a specific country
router.put('/api/countries/:countryId', async (req, res, next) => {
    try {
      // Get the country id
      const { countryId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(countryId)) {
        res.status(400).json({ message: "Invalid object id" });
        return;
      }    
  
      // Values to use for updating the country
      const { name, code } = req.body;
  
      const updatedCountry = await Country.findByIdAndUpdate(countryId, { name, code }, { new: true });
      
      res.status(200).json(updatedCountry);
    } catch (error) {
      res.status(500).json(error);
    }
})

// DELETE /api/countries/:countryId  - Delete a specific country
  router.delete('/api/countries/:countryId', async (req, res, next) => {
    try {
      const { countryId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(countryId)) {
        res.status(400).json({ message: "Invalid object id" });
        return;
      }

      await Country.findByIdAndDelete(countryId);
  
      res.status(204).send();  // No Content
    } catch (error) {
      res.status(500).json(error);
    }
  
})


module.exports = router;