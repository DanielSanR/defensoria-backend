const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const { validaterCampos } = require('../middlewares/validaterCamp')
const { validateToken, AdminDirector } = require("../middlewares/validJwt")
const { getAll, getById, newHelp, deleteHelp, editHelp} = require("../controllers/help.controllers")

router
    .get("/help", validateToken, AdminDirector, getAll)

    .get("/help/:id", validateToken, AdminDirector, getById)
    

    .post("/help",[],newHelp)
/*     .post("/help", [
        check('name', "El nombre es obligatorio").isLength({min: 1}),
        check('victim', "Tipo de víctima es obligatorio"),
        check('latitude', "La ubicación está incompleta").isNumeric(),
        check('longitude', "La ubicación está incompleta").isNumeric().escape()
    , validaterCampos
    ], newHelp) */
    .post("/help/:id",[], editHelp)
    .delete("/help/:id", validateToken, AdminDirector, deleteHelp)

module.exports = router
