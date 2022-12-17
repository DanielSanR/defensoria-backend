const {response} = require('express')
const { validationResult } = require('express-validator')


const validaterCampos = (req, res = response, next) => {

    //Err
    const error = validationResult(req)
    if (!error.isEmpty()){
        return res.status(400).json({
            error: error.mapped()
        })
    }

    next();
}

module.exports = {
    validaterCampos,
}