const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { authRouter } = require('./routes');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

// Setup routes
authRouter(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port: ${port}`));

