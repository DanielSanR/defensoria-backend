const express = require('express')
const routers = express.Router();
const auth = require("./auth")
const user = require("./user.router")
const role = require("./role.router")
const victim = require("./victim.router")
const reason = require("./reason.router")
const suspicious = require("./suspicious.router")
const gender = require("./gender.router")
const place = require("./place.router")
const help = require("./help.router")
const search = require("./search.router")
const pass = require("./password.router")

routers.use("/", auth);
routers.use("/", user);
routers.use("/", role);
routers.use("/", victim);
routers.use("/", reason);
routers.use("/", suspicious);
routers.use("/", gender);
routers.use("/", place);
routers.use("/", help);
routers.use("/", search)
routers.use("/", pass)

module.exports = routers;