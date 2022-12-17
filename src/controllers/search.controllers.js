const Help = require("../models/help.model")

const searchHelp = (req, res) =>{
    console.log("Buscando");
    res.status(200).send("Buscando..")
}

module.exports = {
    searchHelp
}