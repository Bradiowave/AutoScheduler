const mongoose = require('mongoose');

const HobbySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    color: String,
    progress: { type: String, required: true },
    targetTime: { type: String, required: true },
    resetEvery: { type: String, required: true },
    onDays: [Number],
    addsToBreak: Boolean,
    isActive: Boolean,
    autoCompletes: Boolean
});

module.exports = mongoose.model('Hobby', HobbySchema);