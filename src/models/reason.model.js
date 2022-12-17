const mongoose = require("mongoose");

const Reason = mongoose.model("Reason", new mongoose.Schema({
    name: String
    })
);

module.exports = Reason;