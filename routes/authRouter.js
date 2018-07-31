const { authController } = require('../controllers');

module.exports = app => {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.post('/signup', authController.signup);
}