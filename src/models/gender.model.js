const mongoose = require("mongoose");

const Gender = mongoose.model("Gender", new mongoose.Schema({
    name: String
    })
);

module.exports = Gender;