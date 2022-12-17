const express = require('express')
const router = express.Router();
const { check } = require("express-validator")
const { validaterCampos } = require('../middlewares/validaterCamp')
const { validateToken, isAdmin } = require("../middlewares/validJwt")
const { getAll, getById, newUser, deleteUser } = require("../controllers/user.controllers")

router.get("/user", validateToken, isAdmin, getAll)

router.get("/user/:id", validateToken, isAdmin, getById)

router.post("/user", validateToken, isAdmin, [
    //Middleware
        check('name', 'El nombre es obligatorio').trim().escape().not().isEmpty().isLength({min: 4}),
        check('email', 'El email es obligatorio').trim().escape().isEmail(),
        check('password', 'El password debe de ser de al menos 6 caracteres').trim().isLength({min: 6}),
        validaterCampos
    ], newUser)

router.delete("/user/:id", validateToken, isAdmin, deleteUser)

module.exports = router;
