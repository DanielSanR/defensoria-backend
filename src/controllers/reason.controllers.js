const Reason = require("../models/reason.model")

const getAll = async (req, res) => {
    try {
        let reasons = await Reason.find()
        if(!reasons || reasons == ""){
            res.status(404).json({msg: "No hay datos para mostrar"})
        }else{
            res.status(200).send(reasons)
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
};

const getById = async (req, res) =>{    
    const { id } = req.params
    try {
        let reason = await Reason.findById(id)
    
        if(!reason){
            res.status(404).json({ msg: "Nombre de motivo no encontrado" })
        }else{
            res.status(200).send(reason);
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const newReason = async (req, res) => {

    const { name } = req.body
    
    let nameFound = await Reason.findOne({ name })

    if(nameFound){
        return res.status(400).json({ 
            msg: "Nombre de motivo en uso"
        })
    }

    var reason = new Reason(req.body)

    try {
        let newReason = await reason.save()
        res.status(201).json({msg: "Nombre de motivo creado correctamente", nameId: newReason.id})
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const editReason = async (req, res) => {
    const { id } = req.params
    const {name} = req.body

    if(!name){
        return res.status(400).json({msg: "Nombre de motivo no puede ir vacío"})
    }

    const verifyRepeat = await Reason.find({name})//verifica que no haya otro nombre con otro ID
    
    if(verifyRepeat){
        if(verifyRepeat != "" && verifyRepeat[0]["name"] == name && verifyRepeat[0]["_id"] != id){// si el nombre es igual y el ID es distinto al que se está editando que no lo deje editar
            return res.status(400).json({
                msg: 'Nombre de motivo en uso'
            })
        }
    }

    try {
        let foundName = await Reason.findById(id)
        if(!foundName){
            return res.status(404).json({msg: "Nombre de motivo no encontrado"})
        }

        if(foundName.name == name){
            return res.status(200).json({msg: "Nombre de motivo actualizado correctamente"})
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }

    try {
        await Reason.updateOne({_id: id},{$set: {
            name: name,
        }})
        res.status(201).json({msg: "Nombre de motivo actualizado correctamente"})
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
   
}

const deleteReason = async (req, res) => {
    const { id } = req.params
    try {
        let reasonFound = await Reason.findById(id)
        if(!reasonFound){
            return res.status(404).json({ msg: "Nombre de motivo no encontrado" })
        }
        await Reason.deleteOne({_id: id})
        res.status(201).json({msg: "Nombre de motivo eliminado correctamente"})

    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}
module.exports= {
    getAll,
    getById,
    newReason,
    editReason,
    deleteReason
}