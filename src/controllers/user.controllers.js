const bcrypt = require('bcryptjs');
const User = require("../models/user.model")
const Role = require("../models/role.model")

const getAll = async (req, res) => {
    try {
        User.find({}, function(err, users){
            Role.populate(users, {path: "roles"}, function (err, users){
                res.status(200).send(users)
            })
        })
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
};

const getById = async (req, res) =>{    
    const { id } = req.params
    try {
        let user = await User.findById(id)
        if(!user){
            res.status(404).json({ msg: "Usuario no encontrado" })
        }else{
            User.find({_id: id}, function (err, user) {
                Role.populate(user, { path: "roles" }, function (err, user) {
                    res.status(200).send(user);
                });
            });
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const newUser = async (req, res) => {

    const { name, email, password} = req.body
    
    let user = await User.findOne({ email })
    if (user) {
        return res.status(400).json({
            msg: 'Correo no disponible'
        })
    }
    user = new User(req.body);

    //Encriptar constraseña
    const salt = bcrypt.genSaltSync() //Utiliza 10 vueltas por defecto
    user.password = bcrypt.hashSync(password, salt)
    
    if(!req.body.rol){//si no existe rol crea user
        var rol = "user"
        const foundRole = await Role.find({name: {$in: rol}})
        user["roles"] = foundRole.map(role => role._id)
    }else{
        var rol = req.body.rol
        const foundRole = await Role.find({name: {$in: rol}})
        if(foundRole==""|| foundRole == 0){
            return res.status(400).json({
                msg: 'No existe rol'
            })
        }
        user["roles"] = foundRole.map(role => role._id)
    }

    try {
        let newUser = await user.save()
        res.status(201).json({message: "Usuario creado exitosamente", userId: newUser.id})

    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        let dataUser = await User.findById(id)
        if(!dataUser){
            return res.status(404).json({ msg: "Usuario no encontrado" })
        }
        await User.deleteOne({_id: id})
        res.status(201).json({msg: "Usuario eliminado"})

    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}
module.exports= {
    getAll,
    getById,
    newUser,
    deleteUser
}