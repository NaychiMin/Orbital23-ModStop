const express = require('express')

//controller functions
const {signupUser, loginUser, getMinors, getModules, getModuleInfo, getTimetable, getMajors} = require('../controllers/userController')

const router = express.Router() 

//login route
router.post('/login', loginUser) //sending data to server, hence the post

//signup route
router.post('/signup', signupUser) //sending data to server, hence the post

//get minor route
router.get('/minors', getMinors)

//get minor modules
router.get('/minors/:id', getModules)

//get module info
router.get('/module', getModuleInfo)

//get major route
router.get('/minors', getMajors)

//get timetable
router.get('/timetable', getTimetable)

module.exports = router