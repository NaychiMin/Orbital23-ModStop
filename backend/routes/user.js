const express = require('express')

//controller functions
const {signupUser, createRecSched, loginUser, getMinors, getMinorModules, getMajors, getMajorModules, getModuleInfo, getRecSched, updateRecSched, updateRecSchedExtra, getModuleInfoTable} = require('../controllers/userController')

const router = express.Router() 

//login route
router.post('/login', loginUser) 

//signup route
router.post('/signup', signupUser) 

//signup route
router.post('/signupsched', createRecSched) 

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

//get module info for table
router.get('/moduletable', getModuleInfoTable)

//get recSched
router.get('/recommendedSchedule', getRecSched)

//get updatesched
router.post('/updateschedule', updateRecSched)

//get updateschedextra
router.post('/updatescheduleextra', updateRecSchedExtra)

module.exports = router