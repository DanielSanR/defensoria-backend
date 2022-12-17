const express = require('express')
const router = express.Router();
const { check } = require("express-validator")
const { validaterCampos } = require('../middlewares/validaterCamp')
const { validateToken, AdminDirector } = require("../middlewares/validJwt")
const { getAll, getById, newVictim, editVictim, deleteVictim } = require("../controllers/victim.controllers")

router
    .get("/victim", validateToken, AdminDirector, getAll)

    .get("/victim/:id", validateToken, AdminDirector, getById)

    .post("/victim", validateToken, AdminDirector,  [check('name', "El nombre no puede ir vacío").isLength({min: 4}).not().isEmpty().trim().escape(), validaterCampos], newVictim)

    .post("/victim/:id", validateToken, AdminDirector, editVictim)

    .delete("/victim/:id", validateToken, AdminDirector, deleteVictim)

module.exports = router;
