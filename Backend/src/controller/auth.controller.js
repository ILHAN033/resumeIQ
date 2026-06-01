const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require('../models/blacklist.model')



async function userRegistertionController(req,res){
    const {username,email,password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({message:" Please provide username,email and password"})
    }

    const isUserAlreadyExists = await  userModel.findOne({
        $or:[{username},{email}]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({message:"Account already exists with this username or email"})
    }

    const hash = await bcrypt.hash(password,10)

    const user = userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:'1d'})

    res.cookie("token",token)

    res.status(201).json({
        message:"Registered Sucessfully"
    })

}


async function userLoginController(req,res){

    const {email,password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Account doesn't exists with this email"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    
    const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:'1d'})

    res.cookie("token",token)

    res.status(200).json({
        message:"Loged in sucessfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

    

}


async function userLogoutController(req,res){

    const token = req.cookies.token

    if(token){
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie("token")

    return res.status(201).json({message:"User has been logged out sucessfully"})



}


async function getMeController(req,res){

    const user = await userModel.findById(req.user.id)

    if(user){
        return res.status(200).json({
            message:"User details fetched sucessfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        })
    }
}

module.exports = {
    userRegistertionController,
    userLoginController,
    userLogoutController,
    getMeController
}