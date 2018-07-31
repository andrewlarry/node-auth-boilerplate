const mongoose = require('mongoose');

// Override mongoose.Promise
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/auth', { useNewUrlParser: true });

module.exports = mongoose;