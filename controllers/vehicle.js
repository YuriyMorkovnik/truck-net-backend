const Vehicle = require('../models/Vehicle');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.getById = (req, res) => {

};

module.exports.remove = (req, res) => {

};

module.exports.create = async (req, res) => {
  const { name, load } = req.body || {};
  if (!name || !load) {
    res.status(400).json({
      message: 'No name or load',
    })
  }
  const vehicle = await Vehicle.findOne({ name });
  if (vehicle) {
    res.status(409).json({
      message: 'This name has been already',
    })
  } else {
    const newVehicle = new Vehicle({
      name,
      load,
    });

    try {
      await newVehicle.save();
      res.status(201).json(newVehicle);
    } catch (error) {
      errorHandler(res, error);
    }
  }

};

module.exports.update = (req, res) => {

};
