const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    offline: Number,
    online: Number
});

module.exports = mongoose.model('User', UserSchema);