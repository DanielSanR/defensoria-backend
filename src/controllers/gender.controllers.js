const Gender = require("../models/gender.model")

const getAll = async (req, res) => {
    try {
        let gender = await Gender.find()
        if(!gender || gender == ""){
            res.status(404).json({msg: "No hay datos para mostrar"})
        }else{
            res.status(200).send(gender)
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
};

const getById = async (req, res) =>{    
    const { id } = req.params
    try {
        let gender = await Gender.findById(id)
    
        if(!gender){
            res.status(404).json({ msg: "Nombre de tipo de género no encontrado" })
        }else{
            res.status(200).send(gender);
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const newGender = async (req, res) => {

    const { name } = req.body

    if(!name || name == ""){
        return res.status(400).json({ 
            msg: "Nombre no puede ir vacío"
        })
    }
    
    let nameFound = await Gender.findOne({ name })

    if(nameFound){
        return res.status(400).json({ 
            msg: "Nombre en uso"
        })
    }

    var gender = new Gender(req.body)

    try {
        let newGender = await gender.save()
        res.status(201).json({msg: "Nombre de tipo de género creado correctamente", nameId: newGender.id})
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const editGender = async (req, res) => {
    const { id } = req.params
    const {name} = req.body

    if(!name){
        return res.status(400).json({msg: "Nombre de tipo de género no puede ir vacío"})
    }

    const verifyRepeat = await Gender.find({name})//verifica que no haya otro nombre con otro ID
    
    if(verifyRepeat){
        if(verifyRepeat != "" && verifyRepeat[0]["name"] == name && verifyRepeat[0]["_id"] != id){// si el nombre es igual y el ID es distinto al que se está editando que no lo deje editar
            return res.status(400).json({
                msg: 'Nombre en uso'
            })
        }
    }

    try {
        let foundName = await Gender.findById(id)
        if(!foundName){
            return res.status(404).json({msg: "Nombre de tipo de género no encontrado"})
        }

        if(foundName.name == name){
            return res.status(200).json({msg: "Nombre de tipo de género actualizado correctamente"})
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }

    try {
        await Gender.updateOne({_id: id},{$set: {
            name: name,
        }})
        res.status(201).json({msg: "Nombre de tipo de género actualizado correctamente"})
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
   
}

const deleteGender = async (req, res) => {
    const { id } = req.params
    try {
        let genderFound = await Gender.findById(id)
        if(!genderFound){
            return res.status(404).json({ msg: "Nombre de tipo de género no encontrado" })
        }
        await Gender.deleteOne({_id: id})
        res.status(201).json({msg: "Nombre de tipo de género eliminado correctamente"})

    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}
module.exports= {
    getAll,
    getById,
    newGender,
    editGender,
    deleteGender
}