const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const vehicleRoutes = require('./routes/vehicle');
const rideRoutes = require('./routes/ride');
const positionRoutes = require('./routes/position');
const { mongoUri } = require('./config/keys');
const passportMiddlware = require('./middleware/passport');

const app = express();

mongoose.connect(mongoUri, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(`error: ${err}`));

app.use(passport.initialize());
passportMiddlware(passport);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/position', positionRoutes);


module.exports = app;
