//Router
const router = require('express').Router();
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 




//importing the user model 
const User = require('../models/User'); 




//REGISTER 
router.post('/register' , async (req ,res)=>{
    try {

        //password hashing 
        const password = req.body.password ; 
        const hash = await bcrypt.hash(password , 10); 


        //creating new user document
        const newUser = new User({
            username : req.body.username , 
            email : req.body.email , 
            password : hash ,
        }); 



        //async save to the server
        const savedUser = await newUser.save(); 


        //sending result to client 
        res.status(201).json(savedUser); 


    } catch (error) {
        res.status(500).json(error); 
    }
}); 




router.post('/login' , async (req , res)=>{
    const {username , password} = req.body ; 


    try {
        const user = await User.findOne({username : username}); 


        // if the user don't exist 
        if(!user){
            res.status(401).json({message : "unauth"}); 
        }


        //checking the password 
        const isPassValid = await bcrypt.compare(password , user.password);


        // if the passwor is invalid 
        if(!isPassValid){
            res.status(401).json({message : "unauth"});
        }


        //creating a token for the valid user 
        const accessToken = jwt.sign({
            id : user.id ,  isAdmin : user.isAdmin, 
        }, process.env.JWT_SECRET , {expiresIn :"3d"}); 



        const {pass , isAdmin , ...others} = user._doc ; 
        res.status(200).json({...others , accessToken}); 


    } catch (error) {
        res.status(500).json(error); 
    }
}); 















module.exports = router ; 