const mongoose = require("mongoose")

const Place = mongoose.model("Place", new mongoose.Schema({
    name: String
    })
);

module.exports = Place

