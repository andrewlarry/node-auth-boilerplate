const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/auth', { useNewUrlParser: true });

module.exports = mongoose;