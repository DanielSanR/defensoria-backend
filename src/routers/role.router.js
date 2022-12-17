const express = require('express')
const router = express.Router();
const { validateToken, isAdmin} = require("../middlewares/validJwt")
const { getAll } = require("../controllers/role.controllers")

router.get("/roles", validateToken, isAdmin, getAll)

module.exports = router;
