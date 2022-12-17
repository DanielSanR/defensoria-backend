const Help = require("../models/help.model")

const getAll = async (req, res) =>{
    try {
        let help = await Help.find()
        if(!help || help == ""){
            res.status(404).json({msg: "No hay datos para mostrar"})
        }else{
            res.status(200).send(help)
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const getById =  async (req, res) =>{
    const { id } = req.params
    try {
        let help = await Help.findById(id)
    
        if(!help){
            res.status(404).json({ msg: "Ayuda no encontrada" })
        }else{
            res.status(200).send(help);
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const newHelp = async (req, res) =>{
    const {
        victim,
        reason,
        agressor,
        agressorGender,
        age,
        gender, 
        place, 
        name,
        phone,
        email,
        address, 
        latitude, 
        longitude } = req.body

    const date = getTimer()

    var helpSave = {
        victim: victim?.trim(),
        reason: reason,
        agressor: agressor,
        agressorGender: agressorGender?.trim(),
        age: age,
        gender: gender?.trim(),
        place: place?.trim(),
        name: name?.trim(),
        phone: phone?.trim(),
        email: email?.trim(),
        address: address?.trim(),
        latitude: latitude,
        longitude: longitude,
        created_at: date.trim()
    }

    var help = new Help(helpSave)

    try {
        let newHelp = await help.save()
        res.status(201).json({msg: "Ayuda enviada correctamente", nameId: newHelp.id})
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const deleteHelp = async (req, res) =>{
    const { id } = req.params
    try {
        let helpFound = await Help.findById(id)
        if(!helpFound){
            return res.status(404).json({ msg: "Ayuda no encontrada" })
        }
        await Help.deleteOne({_id: id})
        res.status(201).json({msg: "Ayuda eliminada correctamente"})

    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}
const editHelp = async (req, res) => {
    const { id } = req.params
    const data   = req.body

      if(Object.keys(data).length === 0){
        return res.status(400).json({msg:"Datos vacios",
                                     status:false   })
    }  

    try {
        await Help.updateOne({_id: id},data)
        res.status(201).json({msg: "Datos actualizados correctamente",
                              status:true})
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta",
                               status:false
     })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
   
}
const getTimer = () =>{
    const date = new Date()
    const time = "|"+ date + "|"
    return time
}

module.exports = {
    getAll,
    getById,
    newHelp,
    deleteHelp,
    editHelp
}