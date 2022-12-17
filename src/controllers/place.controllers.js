const Place = require("../models/place.model")

const getAll = async (req, res) => {
    try {
        let place = await Place.find()
        if(!place || place == ""){
            res.status(404).json({msg: "No hay datos para mostrar"})
        }else{
            res.status(200).send(place)
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
};

const getById = async (req, res) =>{    
    const { id } = req.params
    try {
        let place = await Place.findById(id)
    
        if(!place){
            res.status(404).json({ msg: "Nombre de lugar no encontrado" })
        }else{
            res.status(200).send(place);
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const newPlace = async (req, res) => {

    const { name } = req.body

    if(!name || name == ""){
        return res.status(400).json({ 
            msg: "Nombre de lugar no puede ir vacío"
        })
    }
    
    let nameFound = await Place.findOne({ name })

    if(nameFound){
        return res.status(400).json({ 
            msg: "Nombre de lugar en uso"
        })
    }

    var place = new Place(req.body)

    try {
        let newPlace = await place.save()
        res.status(201).json({msg: "Nombre de lugar creado correctamente", nameId: newPlace.id})
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const editPlace = async (req, res) => {
    const { id } = req.params
    const {name} = req.body

    if(!name){
        return res.status(400).json({msg: "Nombre de lugar no puede ir vacío"})
    }

    const verifyRepeat = await Place.find({name})//verifica que no haya otro nombre con otro ID
    
    if(verifyRepeat){
        if(verifyRepeat != "" && verifyRepeat[0]["name"] == name && verifyRepeat[0]["_id"] != id){// si el nombre es igual y el ID es distinto al que se está editando que no lo deje editar
            return res.status(400).json({
                msg: 'Nombre en uso'
            })
        }
    }

    try {
        let foundName = await Place.findById(id)
        if(!foundName){
            return res.status(404).json({msg: "Nombre de lugar no encontrado"})
        }

        if(foundName.name == name){
            return res.status(200).json({msg: "Nombre de lugar actualizado correctamente"})
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }

    try {
        await Place.updateOne({_id: id},{$set: {
            name: name,
        }})
        res.status(201).json({msg: "Nombre de lugar actualizado correctamente"})
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
   
}

const deletePlace = async (req, res) => {
    const { id } = req.params
    try {
        let placeFound = await Place.findById(id)
        if(!placeFound){
            return res.status(404).json({ msg: "Nombre de lugar no encontrado" })
        }
        await Place.deleteOne({_id: id})
        res.status(201).json({msg: "Nombre de lugar eliminado correctamente"})

    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}
module.exports= {
    getAll,
    getById,
    newPlace,
    editPlace,
    deletePlace
}