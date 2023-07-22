const User = require('../models/userModel')
const Minor = require('../models/minorModel')
const Major = require('../models/majorModel')
const Module = require('../models/moduleModel')
const recSched = require('../models/recSched')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//login user
const loginUser = async (req, res) => {

    const {email, password} = req.body

    try{
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user._id)

        const username = user.username

        const course = user.course

        res.status(200).json({email, course, username, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

//sign up user
const signupUser = async (req, res) => {
    const {email, password, username, course, track} = req.body

    try{
        const user = await User.signup(email, password, username, course, track)
        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token, username, course, track})
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

//add reccommended schedule for each user
const createRecSched = async (req, res) => {
    const {email, course, track} = req.body

    try{
        const record = await recSched.addDefault(email, course, track)

        res.status(200).json({email, course, track})
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

//get minors
const getMinors = async (req, res) => {
    const minors = await Minor.find()
    if (!minors) {
        res.json({mssg: 'no minors'})
    }
    else {
        res.status(200).json(minors)
    }
}

//get minor modules
const getMinorModules = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such minor'})
    }

    const minor = await Minor.findById(id)

    if(!minor) {
        return res.status(404).json({error: 'No such minor'})
    }

    res.status(200).json(minor)
}

//get major
const getMajors = async (req, res) => {
    const major = await Major.find()
    if (!major) {
        res.json({mssg: 'no majors'})
    }
    else {
        res.status(200).json(major)
    }
}

//get major modules
const getMajorModules = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such major'})
    }

    const major = await Major.findById(id)

    if(!major) {
        return res.status(404).json({error: 'No such major'})
    }

    res.status(200).json(major)
}

//get module info
const getModuleInfo = async (req, res) => {
    const module = await Module.find()
    if(!module) {
        return res.status(404).json({error: 'No such module'})
    }
    res.status(200).json(module)
}


//get recommended schedule
const getRecSched = async (req, res) => {
    const {email} = req.query
    console.log(email)
    const record = await recSched.find({"email": email})
    if(!record) {
        return res.status(404).json({error: 'No record'})
    }
    res.status(200).json(record)
}

//update database for recommended schedule
const updateRecSched = async (req, res) => {
    const {email, draggableText, draggedBox, droppedBox} = req.body

    try{
        console.log('trying')
        await recSched.updateRecScheds(email, draggableText, draggedBox, droppedBox);
        console.log('success')
        res.status(200).json({draggableText, draggedBox, droppedBox})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

//update database for recommended schedule minors/major
const updateRecSchedExtra = async (req, res) => {
    console.log("hello")
    const {email, dragMods, droppedBox} = req.body
    console.log(dragMods)

    try{
        console.log('trying')
        await recSched.updateRecSchedsExtra(email, dragMods, droppedBox);
        console.log('success')
        res.status(200).json({dragMods, dragMods, droppedBox})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}
module.exports = {signupUser, loginUser, getMinors, getMinorModules, getMajors, getMajorModules, getModuleInfo, createRecSched, getRecSched, updateRecSched, updateRecSchedExtra}