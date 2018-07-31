const { User } = require('../models');

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
        .then(() => res.send({ success: true }));
    })
    .catch(err => next(err));

}