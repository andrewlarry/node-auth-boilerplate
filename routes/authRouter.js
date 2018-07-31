const { passport } = require('../services');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const { authController } = require('../controllers');

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
    res.send('Hello World!');
  });

  app.post('/signin', requireSignin, authController.signin);

  app.post('/signup', authController.signup);
}