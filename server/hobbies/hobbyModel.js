const mongoose = require('mongoose');

const HobbySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    color: String,
    progress: String,
    weeklyProgress: String,
    targetTime: String,
    resetEvery: String,
    resetAt: String,
    onDays: [Number],
    addsToBreak: Boolean,
    isActive: Boolean,
    autoCompletes: Boolean
});

module.exports = mongoose.model('Hobby', HobbySchema);