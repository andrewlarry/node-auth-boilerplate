const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { authRouter } = require('./routes');


// DB setup
require('./db');


const app = express();

if (process.env.NODE_ENV === 'dev') {
  // Console logging with morgan
  app.use(morgan('combined'));
}

app.use(bodyParser.json({ type: '*/*' }));

// Setup routes
authRouter(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port: ${port}`));


// Export app for testing
module.exports = app;