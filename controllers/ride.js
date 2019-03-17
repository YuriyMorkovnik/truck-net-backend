const errorHandler = require('../utils/errorHandler');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');
const Ride = require('../models/Ride');



module.exports.getAll = async (req, res) => {
  try {
    const rides = await Ride.find();
    res.status(200).json(rides);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.getById = async (req, res) => {
  const { id } = req.params || {};
  try {
    const ride = await Ride.findOne({ _id: id });
    if (ride) {
      res.status(200).json(ride);
    } else {
      res.status(404);
    }
  } catch (error) {
    errorHandler(res, error);
  }



};

module.exports.create = async (req, res) => {
  const {
    originName,
    destinationName,
    travelTime,
    driver,
    vehicleTypeId,
  } = req.body || {};
  if (!originName || !destinationName || !travelTime || !driver || !vehicleTypeId) {
    res.status(400).json({
      message: 'One of params not found',
    })
  }
  const vehicle = await Vehicle.findOne({ _id: vehicleTypeId });
  if (!vehicle) return res.status(404);
  const ride = await new Ride({
    originName,
    destinationName,
    travelTime,
    driver,
    vehicle,
  });

  try {
    await ride.save();
    res.status(201).json(ride);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.changeStatus = (req, res) => {
  const ridesList = req.body;
  try {
    ridesList.forEach(async ({ _id, status }) => {
      await Ride.updateOne({ _id }, { status });
    })
  } catch (error) {
    errorHandler(res, error);
  }

  res.status(200).json({
    message: 'okay',
  })
};
