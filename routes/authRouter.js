module.exports = app => {
  app.get('/', (req, res) => {
    res.send(['one', 'two', 'three']);
  });
}