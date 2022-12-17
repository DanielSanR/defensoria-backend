const mongoose = require("mongoose");

const Victim = mongoose.model("Victim", new mongoose.Schema({
    name: String
    })
);

module.exports = Victim;