const express = require('express')

//controller functions
const {signupUser, loginUser} = require('../controllers/userController')

const router = express.Router() 

//login route
router.post('/login', loginUser) //sending data to server, hence the post

//signup route
router.post('/signup', signupUser) //sending data to server, hence the post

module.exports = router