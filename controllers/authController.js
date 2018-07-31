const { User } = require('../models');
const jwt = require('jwt-simple');

const { JWT_SECRET } = require('../config');

const createToken = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, JWT_SECRET);
}

// Attempt to create a new user and send back a token
module.exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send({ error: 'Email and password must be provided'})
  }
  
  User.findOne({ email })
    .then(result => {
      if (result) return res.status(422).send({ error: 'Email is in use' });
      
      const user = new User({ email, password });
      return user.save()
        .then(() => res.send({ token: createToken(user) }));
    })
    .catch(err => next(err));
}

// Successful signin, sent a token
module.exports.signin = (req, res, next) => {
  res.send({ token: createToken(req.user) });
}