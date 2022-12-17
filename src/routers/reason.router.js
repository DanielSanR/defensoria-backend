const express = require('express')
const router = express.Router();
const { check } = require("express-validator")
const { validaterCampos } = require('../middlewares/validaterCamp')
const { validateToken, AdminDirector } = require("../middlewares/validJwt")
const { getAll, getById, newReason, editReason, deleteReason } = require("../controllers/reason.controllers")

router
    .get("/reason", validateToken, AdminDirector, getAll)

    .get("/reason/:id", validateToken, AdminDirector, getById)

    .post("/reason", validateToken, AdminDirector,  [check('name', "El nombre no puede ir vacío").isLength({min: 4}).not().isEmpty().trim().escape(), validaterCampos], newReason)

    .post("/reason/:id", validateToken, AdminDirector, editReason)

    .delete("/reason/:id", validateToken, AdminDirector, deleteReason)

module.exports = router;
