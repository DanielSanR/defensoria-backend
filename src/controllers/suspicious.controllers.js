const Suspicious = require("../models/suspicious.model")

const getAll = async (req, res) => {
    try {
        let suspicious = await Suspicious.find()
        if(!suspicious || suspicious == ""){
            res.status(401).json({msg: "No hay datos para mostrar"})
        }else{
            res.status(200).send(suspicious)
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
};

const getById = async (req, res) =>{    
    const { id } = req.params
    try {
        let suspicious = await Suspicious.findById(id)
    
        if(!suspicious){
            res.status(404).json({ msg: "Nombre de tipo de sospechoso no encontrado" })
        }else{
            res.status(200).send(suspicious);
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const newSuspicious = async (req, res) => {

    const { name } = req.body

    if(!name || name == ""){
        return res.status(400).json({ 
            msg: "Nombre no puede ir vacío"
        })
    }
    
    let nameFound = await Suspicious.findOne({ name })

    if(nameFound){
        return res.status(400).json({ 
            msg: "Nombre en uso"
        })
    }

    var suspicious = new Suspicious(req.body)

    try {
        let newSuspicious = await suspicious.save()
        res.status(201).json({msg: "Nombre de tipo de sospechoso creado correctamente", nameId: newSuspicious.id})
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const editSuspicious = async (req, res) => {
    const { id } = req.params
    const {name} = req.body

    if(!name){
        return res.status(400).json({msg: "Nombre de tipo de sospechoso no puede ir vacío"})
    }

    const verifyRepeat = await Suspicious.find({name})//verifica que no haya otro nombre con otro ID
    
    if(verifyRepeat){
        if(verifyRepeat != "" && verifyRepeat[0]["name"] == name && verifyRepeat[0]["_id"] != id){// si el nombre es igual y el ID es distinto al que se está editando que no lo deje editar
            return res.status(400).json({
                msg: 'Nombre en uso'
            })
        }
    }

    try {
        let foundName = await Suspicious.findById(id)
        if(!foundName){
            return res.status(404).json({msg: "Nombre de tipo de sospechoso no encontrado"})
        }

        if(foundName.name == name){
            return res.status(200).json({msg: "Nombre de tipo de sospechoso actualizado correctamente"})
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }

    try {
        await Suspicious.updateOne({_id: id},{$set: {
            name: name,
        }})
        res.status(201).json({msg: "Nombre de tipo de sospechoso actualizado correctamente"})
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
   
}

const deleteSuspicious = async (req, res) => {
    const { id } = req.params
    try {
        let suspiciousFound = await Suspicious.findById(id)
        if(!suspiciousFound){
            return res.status(404).json({ msg: "Nombre de tipo de sospechoso no encontrado" })
        }
        await Suspicious.deleteOne({_id: id})
        res.status(201).json({msg: "Nombre de tipo de sospechoso eliminado correctamente"})

    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}
module.exports= {
    getAll,
    getById,
    newSuspicious,
    editSuspicious,
    deleteSuspicious
}