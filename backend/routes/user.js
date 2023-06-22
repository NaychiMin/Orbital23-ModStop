const express = require('express')

//controller functions
const {signupUser, loginUser, getMinors, getModules} = require('../controllers/userController')

const router = express.Router() 

//login route
router.post('/login', loginUser) //sending data to server, hence the post

//signup route
router.post('/signup', signupUser) //sending data to server, hence the post

//get minor route
router.get('/minors', getMinors)

//get minor modules
router.get('/minors/:id', getModules)

module.exports = router