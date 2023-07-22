const express = require('express')

//controller functions
const {signupUser, createRecSched, loginUser, getMinors, getMinorModules, getMajors, getMajorModules, getModuleInfo, getRecSched, updateRecSched, updateRecSchedExtra} = require('../controllers/userController')

const router = express.Router() 

//login route
router.post('/login', loginUser) //sending data to server, hence the post

//signup route
router.post('/signup', signupUser) //sending data to server, hence the post

//signup route
router.post('/signupsched', createRecSched) //sending data to server, hence the post

//get minor route
router.get('/minors', getMinors)

//get minor modules
router.get('/minors/:id', getMinorModules)

//get major route
router.get('/majors', getMajors)

//get major modules
router.get('/majors/:id', getMajorModules)

//get module info
router.get('/module', getModuleInfo)


//get recSched
router.get('/recommendedSchedule', getRecSched)

//get updatesched
router.post('/updateschedule', updateRecSched)

//get updateschedextra
router.post('/updatescheduleextra', updateRecSchedExtra)

module.exports = router