const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { jwtKey } = require('../config/keys');

const User = require('mongoose').model('users');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtKey,
};

module.exports = passport => {
  passport.use(new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.userId).select('email id');
      if(user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  }));
};
