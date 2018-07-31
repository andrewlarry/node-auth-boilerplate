const passport = require('passport');

// JWT Strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Local Strategy
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models');
const { JWT_SECRET } = require('../config');

// Set up options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub)
    .then(user => {
      (user) ? done(null, user) : done(null, false);
    })
    .catch(err => done(err, false));
});

// Set up options for Local Strategy
const loginOptions = {
  usernameField: 'email'
}

const localLogin = new LocalStrategy(loginOptions, (email, password, done) => {
  User.findOne({ email })
    .then(user => {
      if (!user) return done(null, false);

    })
    .catch(err => done(err, false));
});


passport.use(jwtLogin);
passport.use(localLogin);

module.exports = passport;