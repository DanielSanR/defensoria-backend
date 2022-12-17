const sgMail = require('@sendgrid/mail');
const env = require("dotenv/config")

const sendEmailForPass = async (to, token) =>{

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    try {
        await sgMail.send({
            to: to,
            from: process.env.FROM_EMAIL,
            subject: 'RESTABLECIMIENTO DE CONTRASEÑA - DEFENSORÍA DEL NIÑO',
            text: '¡ATENCIÓN!, NO COMPARTIR / MOSTRAR ESTE MENSAJE.',
            html: `¡ATENCIÓN!, NO COMPARTIR / MOSTRAR ESTE MENSAJE. <a href="${process.env.URL_HOST+token}">Clic aquí para cambiar tu contraseña</a>`
        })
    } catch (error) {
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

module.exports = {
    sendEmailForPass
}