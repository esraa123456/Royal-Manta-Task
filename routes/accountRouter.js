const express = require("express");
const router = express.Router();
const registerAdmin = require('./registerAdmin')
const adminLogin = require('./adminLogin')
const deleteUser = require('./deleteUser')

router.use('/register',registerAdmin)
router.use('/login',adminLogin)
router.use('/delete-user',deleteUser)

module.exports = router;
