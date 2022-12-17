const bcrypt = require('bcryptjs');
const {response} = require("express")
const Role = require("../models/role.model")
const User = require('../models/user.model')
const { generateJWTLogin, revalidarJWToken } = require('../libs/generateJWT')
const { parserLogin } = require("../libs/parserJWT")

const createUser = async (req, res = response) =>{

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    try {

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                msg: 'Correo no disponible'
            })
        }

        user = new User( req.body );

        if(!req.body.rol){//si no existe rol crea uno por defecto
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
        
        //Encriptar constraseña
        const salt = bcrypt.genSaltSync() //Utiliza 10 vueltas por defecto
        user.password = bcrypt.hashSync(password, salt)

        await user.save()
        
        res.status(201).json({
            uid: user.id,
            name: user.name,
            email: user.email,
            msg: "Usuario creado correctamente"
        })

    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const loginUser = async (req, res = response) =>{

    const {email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: 'Datos incorrectos'
            })
        }

        //Confirmar los password

        const validpassword = bcrypt.compareSync(password, user.password)
        if (!validpassword) {
            return res.status(400).json({
                msg: 'Datos incorrectos'
            })
        }
        
        if(user){
            const data = await parserLogin(user)
            //Generar JWT
            const token = await generateJWTLogin( data.id, data.name, data.email, data.rol )
            res.json({
                token
            })
        }else{
            res.status(500).json({
                msg: 'No se pudo generar el token'
            })
        }     

    } catch (error) {
        res.status(500).json({ msg: `${password}`})
                console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
    
}

const reGenerateToken = async(req, res = response) =>{
    const {id, name, rol} = req

    //Generar un nuevo token y retornar en esta petición

    const token = await revalidarJWToken( id, name, rol)
    
    res.json({
        id,
        name,
        rol,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    reGenerateToken
}