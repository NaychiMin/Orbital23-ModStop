const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

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
    const {email, password, username, course} = req.body

    try{
        const user = await User.signup(email, password, username, course)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token, username, course})
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = {signupUser, loginUser}