const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const { validaterCampos } = require('../middlewares/validaterCamp')
const { validateToken, AdminDirector} = require("../middlewares/validJwt")
const {getAll, getById, newPlace, editPlace, deletePlace} = require("../controllers/place.controllers")

router 
    .get("/place", validateToken, AdminDirector, getAll)
    .get("/place/:id", validateToken, AdminDirector, getById)
    .post("/place", validateToken, AdminDirector, [check('name', "El nombre no puede ir vacío").isLength({min: 4}).not().isEmpty().trim().escape(), validaterCampos], newPlace)
    .post("/place/:id", validateToken, AdminDirector, editPlace)
    .delete("/place/:id", validateToken, AdminDirector, deletePlace)

module.exports = router;