
const { Router } = require("express")
const { check } = require('express-validator')
const { validaterCampos } = require('../middlewares/validaterCamp')
const {createUser, loginUser, reGenerateToken} = require('../controllers/auth')
const { validateToken } = require('../middlewares/validJwt')

const router = Router();

router.post('/signup',
    [
    //Middleware
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        validaterCampos
    ], createUser)

router.post('/signin',
    [
        //Middleware
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        validaterCampos
    ],
    loginUser
    )

router.get('/renew', validateToken, reGenerateToken)

module.exports = router;
