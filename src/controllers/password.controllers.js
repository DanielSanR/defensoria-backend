const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const { generateJWTForgotPass } = require('../libs/generateJWT')
const { sendEmailForPass } = require("../libs/sendEmail")
const { parserForgotPass } = require("../libs/parserJWT")

const forgotPass = async (req, res) => {//envia al correo electrónico el link con el token para cambiar la contraseña

    res.status(200).json({msg: "Si la cuenta corresponde a un usuario registrado, se le enviará un mail para el restablecimiento de su contraseña."})

    const { email } = req.body

    try {
        let newEmail = await User.findOne({ email })
        if(newEmail){
        
            let newJWTpass = await generateJWTForgotPass(newEmail._id, newEmail.name, newEmail.email)
            sendEmailForPass(newEmail.email, newJWTpass)
            
        }else{
            console.log("Email NO registrado en el sistema");
            return false
        }
    } catch (error) {
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const resetPass = async (req, res) =>{//recibe el token y la nueva contraseña y la cambia 
    const { password, token } = req.body
    
    try {
        var parserToken = parserForgotPass(token)
        var email = parserToken.email
        let verifyEmail = await User.findOne({ email })
        if (!verifyEmail) {
            return res.status(400).json({
                msg: 'Usuario no encontrado'
            })
        }

        var id = parserToken.id
        //Encriptar constraseña
        const salt = bcrypt.genSaltSync() //Utiliza 10 vueltas por defecto
        var newPassword = await User.updateOne({_id: id},{$set:{
            password: bcrypt.hashSync(password, salt)
        }})

        if(newPassword){
            res.status(200).json({msg: "Contraseña modificada correctamente"})
        }
    } catch (error) {
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
    }
    
}

module.exports= {
    forgotPass,
    resetPass
}