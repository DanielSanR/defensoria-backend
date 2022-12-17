const { response } = require ('express')
const jwt = require('jsonwebtoken')
const User = require("../models/user.model")
const Role = require("../models/role.model")
const SECRETJWT = "This is a secret very secret"

const validateToken = (req, res = response, next) => {
    
    //x-token
    const token = req.header('x-token')
    
    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { id, name, rol } =  jwt.verify(
            token,
            SECRETJWT
        )
        
        req.id = id
        req.name = name
        req.rol = rol
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
    next()
}

const isAdmin = (req, res, next) =>{
    
    User.findById(req.id).exec((err, user) => {
        if (err) {
          res.status(500).send({ msg: err });
          return;
        }
        Role.find({_id: {$eq: user.roles}}, (err, roles) =>{
            if(err){
                res.status(500).send({msg: err})
                return
            }else{
                if(roles[0]["name"] === "admin"){
                    next()
                    return
                }else{
                    res.status(403).send({ msg: "Requiere rol de administrador" });
                    return;
                }
            }
        })
    });
}

const AdminDirector = (req, res, next) =>{
    
    User.findById(req.id).exec((err, user) => {
        if (err) {
          res.status(500).send({ msg: err });
          return;
        }
        Role.find({_id: {$eq: user.roles}}, (err, roles) =>{
            if(err){
                res.status(500).send({msg: err})
                return
            }else{
                if(roles[0]["name"] === "admin" || roles[0]["name"] === "director"){
                    next()
                    return
                }else{
                    res.status(403).send({ msg: "Requiere rol de administrador o director" });
                    return;
                }
            }
        })
    });
}

const validateTokenResetPass = (req, res, next) =>{//valida el token para cambiar la contraseña
    const token = req.body.token
    
    try {
        const verify = jwt.verify(token, SECRETJWT)
    } catch (error) {
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
    
    next()
}


module.exports = {
    validateToken,
    isAdmin,
    AdminDirector,
    validateTokenResetPass
};
