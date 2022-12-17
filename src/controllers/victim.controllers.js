const Victim = require("../models/victim.model")

const getAll = async (req, res) => {
    try {
        let victims = await Victim.find()
        if(!victims || victims == ""){
            res.status(401).json({msg: "No hay datos para mostrar"})
        }else{
            res.status(200).send(victims)
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
};

const getById = async (req, res) =>{    
    const { id } = req.params
    try {
        let victim = await Victim.findById(id)
    
        if(!victim){
            res.status(404).json({ msg: "Nombre de tipo de víctima no encontrado" })
        }else{
            res.status(200).send(victim);
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const newVictim = async (req, res) => {

    const { name } = req.body

    if(!name || name == ""){
        return res.status(400).json({ 
            msg: "Nombre no puede ir vacío"
        })
    }
    
    let nameFound = await Victim.findOne({ name })

    if(nameFound){
        return res.status(400).json({ 
            msg: "Nombre en uso"
        })
    }

    var victim = new Victim(req.body)

    try {
        let newVictim = await victim.save()
        res.status(201).json({msg: "Nombre de tipo de víctima creado correctamente", nameId: newVictim.id})
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const editVictim = async (req, res) => {
    const { id } = req.params
    const {name} = req.body

    if(!name){
        return res.status(400).json({msg: "Nombre de tipo de víctima no puede ir vacío"})
    }

    const verifyRepeat = await Victim.find({name})//verifica que no haya otro nombre con otro ID
    
    if(verifyRepeat){
        if(verifyRepeat != "" && verifyRepeat[0]["name"] == name && verifyRepeat[0]["_id"] != id){// si el nombre es igual y el ID es distinto al que se está editando que no lo deje editar
            return res.status(400).json({
                msg: 'Nombre en uso'
            })
        }
    }

    try {
        let foundName = await Victim.findById(id)
        if(!foundName){
            return res.status(404).json({msg: "Nombre de tipo de víctima no encontrado"})
        }

        if(foundName.name == name){
            return res.status(200).json({msg: "Nombre de tipo de víctima actualizado correctamente"})
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }

    try {
        await Victim.updateOne({_id: id},{$set: {
            name: name,
        }})
        res.status(201).json({msg: "Nombre de tipo de víctima actualizado correctamente"})
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
   
}

const deleteVictim = async (req, res) => {
    const { id } = req.params
    try {
        let victimFound = await Victim.findById(id)
        if(!victimFound){
            return res.status(404).json({ msg: "Nombre de tipo de víctima no encontrado" })
        }
        await Victim.deleteOne({_id: id})
        res.status(201).json({msg: "Nombre de tipo de víctima eliminado correctamente"})

    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}
module.exports= {
    getAll,
    getById,
    newVictim,
    editVictim,
    deleteVictim
}