const express = require('express')
const router = express.Router();
const { check } = require("express-validator")
const { validateToken, AdminDirector } = require("../middlewares/validJwt")
const { searchHelp } = require("../controllers/search.controllers")


router
    .get("/search/:help", validateToken, AdminDirector, searchHelp)

module.exports = router