//Router
const router = require('express').Router();
const bcrypt = require('bcrypt'); 




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















module.exports = router ; 