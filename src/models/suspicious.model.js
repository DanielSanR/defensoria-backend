const mongoose = require("mongoose");

const Suspicious = mongoose.model("Suspicious", new mongoose.Schema({
    name: String
    })
);

module.exports = Suspicious;