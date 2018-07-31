const { passport } = require('../services');

const requireAuth = passport.authenticate('jwt', { session: false });

const { authController } = require('../controllers');

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
    res.send('Hello World!');
  });

  app.post('/signup', authController.signup);
}