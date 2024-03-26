//Router
const router = require('express').Router();
const {verfiyTokenAndAutho, verfiyTokenAndAdmin} = require('../middleware/verifyToken'); 
const User = require('../models/Product'); 




router.post('/' , verfiyTokenAndAdmin , async (req , res)=>{
    try {
        const newProd = new Product(req.body); 
        const savedProd = await newProd.save(); 

        res.status(200).json(savedProd); 

    } catch (error) {
        res.status(500).json({message : error}); 
    }
});











module.exports = router ; 