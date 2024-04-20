const router = require("express").Router()
const auth = require("../controller/auth")

router.post('/auth/register', auth.login)
router.post('/auth/login', auth.register)

module.exports = router