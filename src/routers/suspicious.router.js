const express = require('express')
const router = express.Router();
const { check } = require("express-validator")
const { validaterCampos } = require('../middlewares/validaterCamp')
const { validateToken, AdminDirector } = require("../middlewares/validJwt")
const { getAll, getById, newSuspicious, editSuspicious, deleteSuspicious } = require("../controllers/suspicious.controllers")

router
    .get("/suspicious", validateToken, AdminDirector, getAll)

    .get("/suspicious/:id", validateToken, AdminDirector, getById)

    .post("/suspicious", validateToken, AdminDirector, [check('name', "El nombre no puede ir vacío").isLength({min: 4}).not().isEmpty().trim().escape(), validaterCampos], newSuspicious)

    .post("/suspicious/:id", validateToken, AdminDirector, editSuspicious)

    .delete("/suspicious/:id", validateToken, AdminDirector, deleteSuspicious)

module.exports = router;
