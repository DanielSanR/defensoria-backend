const express = require('express')
const router = express.Router();
const { check } = require("express-validator")
const { validaterCampos } = require('../middlewares/validaterCamp')
const { validateToken, AdminDirector } = require("../middlewares/validJwt")
const { getAll, getById, newGender, editGender, deleteGender } = require("../controllers/gender.controllers")

router
    .get("/gender", validateToken, AdminDirector, getAll)

    .get("/gender/:id", validateToken, AdminDirector, getById)

    .post("/gender", validateToken, AdminDirector, [check('name', "El nombre no puede ir vacío").isLength({min: 4}).not().isEmpty().trim().escape(), validaterCampos], newGender)

    .post("/gender/:id", validateToken, AdminDirector, editGender)

    .delete("/gender/:id", validateToken, AdminDirector, deleteGender)

module.exports = router;
