const jwt = require("jsonwebtoken");
const SECRETJWT = "This is a secret very secret"

const generateJWTLogin = (id, name, email, rol) => {
    return new Promise( (resolve, reject) => {
        const payload = {id, name, email, rol}
        jwt.sign( payload, SECRETJWT, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err){
                console.log(err)
                reject('No se pudo generar el token')
            }
            resolve(token)
        })

    })

}

const generateJWTForgotPass = (id, name, email) =>{//generate token for forgot password
    return new Promise( (resolve, reject) =>{
        const payload = {id, name, email}
        jwt.sign( payload, SECRETJWT, {
            expiresIn: '1h'
        }, (err, token) =>{
            if(err){
                console.error(`Tipo: ${err.name}, Error: ${err.message}`);
                reject('No se puedo generar el token')
            }
            resolve(token)
        })
    })
}

const revalidarJWToken = (uid, name, rol) => {
    return new Promise( (resolve, reject) => {
        const payload = {uid, name, rol}
        jwt.sign( payload, SECRETJWT, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err){
                console.log(err)
                reject('No se pudo generar el token')
            }
            resolve(token)
        })

    })

}

module.exports = {
    generateJWTLogin,
    generateJWTForgotPass,
    revalidarJWToken
}