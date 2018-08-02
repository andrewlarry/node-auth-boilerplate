const { User } = require('../models');
const jwt = require('jwt-simple');

const createToken = (user) => {
  // The iat and exp JWT claims must be stored in seconds
  const timestamp = new Date().getTime() / 1000;

  // Expire the JWT in 24 hours using the exp tag
  return jwt.encode({ 
      sub: user._id, 
      iat: timestamp, 
      exp: timestamp + 86400
    }, process.env.JWT_SECRET
  );
}

// Attempt to create a new user and send back a token
module.exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  // Client didn't send an email and password, return error
  if (!email || !password) {
    return res.status(422).send({ error: 'Email and password must be provided'});
  }
  
  User.findOne({ email })
    .then(result => {
      // Email is already present in database
      if (result) return res.status(422).send({ error: 'Email is in use' });
      
      // Create new user with email and password, return token
      const user = new User({ email, password });
      return user.save()
        .then(() => res.send({ token: createToken(user) }));
    })
    .catch(err => next(err));
}

// Successful signin, send a token
module.exports.signin = (req, res) => {
  res.send({ token: createToken(req.user) });
}