const express = require('express')
const router = express.Router();
const { check } = require("express-validator")
const { validaterCampos } = require('../middlewares/validaterCamp')
const { forgotPass, resetPass } = require('../controllers/password.controllers');
const { validateTokenResetPass } = require('../middlewares/validJwt');

router
    .post("/forgot-pass", [check('email', "El email no puede ir vacío").isLength({min: 5}).not().isEmpty().trim().escape(), validaterCampos], forgotPass)

    .post("/reset-pass", validateTokenResetPass, [check('password', "La contraseña no puede ir vacío").isLength({min: 6}).not().isEmpty().trim(), validaterCampos], resetPass)

module.exports = router;
