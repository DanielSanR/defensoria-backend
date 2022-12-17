const jwt = require("jsonwebtoken")
const SECRETJWT = process.env.SECRETJWT
const Role = require ("../models/role.model")

const parserLogin = async ( data ) => {
    //busca los modulos y roles en bd y los encuentra por nombre y no por id
    const foundRole = await Role.findById(data["roles"])
    var rol = foundRole.name
    var objData = {//arma el objeto
        id: data._id,
        name: data.name,
        email: data.email,
        rol: rol
    }
    return objData
}

const parserForgotPass = (token) =>{
    return jwt.verify(token, SECRETJWT)
}


module.exports = {
    parserLogin,
    parserForgotPass
}