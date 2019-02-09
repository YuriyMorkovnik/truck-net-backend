const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { jwtKey } = require('../config/keys');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).json({
      message: 'No email or password'
    })
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(404).json({
      message: 'User not found',
    });
    return;
  }
  const isCorrectPassword = bcrypt.compareSync(password, user.password);
  if (isCorrectPassword) {
    const token = jwt.sign({
      email: user.email,
      userId: user._id,
    }, jwtKey, { expiresIn: 60 * 60 });
    res.status(200).json({
      token: `Bearer ${token}`,
    })
  } else {
    res.status(401).json({
      message: 'Wrong password'
    })
  }
};

module.exports.register = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).json({
      message: 'No email or password'
    })
  }
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(409).json({
      message: 'This email has been used already',
    });
  }
  const newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = new User({
    email,
    password: newPassword,
  });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    errorHandler(res, error);
  }
};
