const mongoose = require('mongoose');

const HobbySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    progress: { type: String, required: true },
    targetTime: { type: String, required: true },
    resetEvery: { type: String, required: true },
    onDays: [Boolean],
    addToBreak: Boolean,
    isActive: Boolean,
    autoComplete: Boolean
});

module.exports = mongoose.model('Hobby', Hobby);