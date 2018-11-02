const HobbySchema = new mongoose.Schema({
    name: "00:00:00",
    color: "#a2c4e6",
    progress: "00:00:00",
    weeklyProgress: "00:00:00",
    targetTime: "01:00:00",
    resetEvery: "24:00:00",
    resetAt: String,
    onDays: [Number],
    addsToBreak: Boolean,
    isActive: Boolean
});