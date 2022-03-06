const express = require('express');
const router = express.Router();
const Trips = require('../models/trip.model');
const Requests = require('../models/request.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');

// GET /api/requests - Get all existing requests
router.get('/api/requests', async (req, res, next) => {
	try {
		const allRequests = await Requests.find();

		res.status(200).json(allRequests);
	} catch (error) {
		res.status(500).json(error);
	}
});

// POST /api/requests - Create a new request
router.post('/api/requests', async (req, res, next) => {
	try {
		// Get the data from the request body
		const {
			destination,
			startDate,
			endDate,
			duration,
			pax,
			budgetPerPerson,
			typeOfAccommodation,
			detailsOccasion,
			activitiesToInclude,
			specialRequest,
			requestedBy,
			status,
			tripPlan,
		} = req.body;

		// Save the data in the db
		const createdRequest = await Requests.create({
			destination,
			startDate,
			endDate,
			duration,
			pax,
			requestedBy,
			budgetPerPerson,
			typeOfAccommodation,
			detailsOccasion,
			activitiesToInclude,
			specialRequest,
			status,
			tripPlan,
		});

		res.status(201).json(createdRequest); // 201 Created

		// Update user who created the request
		console.log({ createdRequest });

		const updatedUser = await User.findByIdAndUpdate(requestedBy, {
			$push: { requestedTrips: createdRequest._id },
		});
	} catch (error) {
		res.status(500).json(error); // Internal Server Error
	}
});

// GET /api/requests/:requestId  - Get a specific request
router.get('/api/requests/:requestId', async (req, res, next) => {
	try {
		// Get the request id from the URL
		const { requestId } = req.params; //   in Express `:` means `req.params`
		console.log(`requestId`, requestId);

		if (!mongoose.Types.ObjectId.isValid(requestId)) {
			res.status(400).json({ message: 'Invalid object id' });
			return;
		}

		// Make a DB query
		const oneRequest = await Requests.findById(requestId).populate('destination').populate('requestedBy');

		// Send the response
		res.status(200).json(oneRequest);
	} catch (error) {
		res.status(500).json(error);
	}
});

// DELETE /api/requests/:requestId  - Delete a specific request
router.delete('/api/requests/:requestId', async (req, res, next) => {
	try {
		const { requestId } = req.params;

		if (!mongoose.Types.ObjectId.isValid(requestId)) {
			res.status(400).json({ message: 'Invalid object id' });
			return;
		}

		const foundedRequest = await Requests.findById(requestId).populate('requestedBy');

		// Update user who created the request
		const creatorUser = await User.findById(foundedRequest.createdBy);
		const updatedCreatorUser = await User.findByIdAndUpdate(foundedRequest.requestedBy, { $pull: { requestedTrips: foundedRequest._id } });

		await Requests.findByIdAndDelete(requestId);

		res.status(204).send(); // No Content
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
