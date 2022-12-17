
const Role = require("../models/role.model")

const getAll = async (req, res) => {
    try {
        let dataRole = await Role.find()
        res.status(200).send(dataRole);
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

module.exports= {
    getAll
}