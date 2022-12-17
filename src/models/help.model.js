const mongoose = require("mongoose")
const Help = mongoose.model("Help", new mongoose.Schema({
        victim: String,
        reason: [String],
        agressor: [String],
        agressorGender: String,
        age: Number,
        gender: String,
        place: [String],
        name: String,
        phone:String,
        email:String,
        address:String,
        latitude: Number,
        longitude: Number,
        created_at: String
    })
)

module.exports = Help