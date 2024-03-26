//Router
const router = require('express').Router();
const {verfiyTokenAndAutho, verfiyTokenAndAdmin} = require('../middleware/verifyToken'); 
const Product = require('../models/Product');
const User = require('../models/Product'); 





//adding new product to dataBase
router.post('/' , verfiyTokenAndAdmin , async (req , res)=>{
    try {
        const newProd = new Product(req.body); 
        const savedProd = await newProd.save(); 

        res.status(200).json(savedProd); 

    } catch (error) {
        res.status(500).json({message : error}); 
    }
});





//updating a product 
router.put('/:id' , verfiyTokenAndAdmin , async (req , res)=>{
    try {
        const {id} = req.params; 

        const updatedProd = await Product.findByIdAndUpdate(id , {
            $set : req.body , 
        } , {new : true}); 


        res.status(200).json(updatedProd); 
    } catch (error) {
        res.status(500).json({message : error}); 
    }
});







router.delete('/:id' , verfiyTokenAndAdmin , async (req , res)=>{
    try {
        const {id} = req.params; 

        const deletedProd = await Product.findByIdAndRemove(id); 


        res.status(200).json({message : "deleted"}); 
    } catch (error) {
        res.status(500).json({message : error}); 
    }
});




router.get('/all' , async (req,res)=>{
    try {
        const products = await Product.find(); 
        res.status(200).json(products); 
    } catch (error) {
        res.status(500).json(error); 
    }
});










module.exports = router ; 