//Router
const router = require('express').Router();
const {verfiyTokenAndAutho, verfiyTokenAndAdmin} = require('../middleware/verifyToken'); 
const Product = require('../models/Product');






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
        const category = req.query.category ; 
        const newProducts = req.query.new ; 


        let products ; 

        if (newProducts) products = await Product.find().sort({createdAt : -1}).limit(5); 
        else if (category) products = await Product.find({categories : {
            $in:[category] ,
        }})
        else products = await Product.find(); 



 
        res.status(200).json(products); 
    } catch (error) {
        res.status(500).json(error); 
    }
});





router.get('/:id' , async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id); 
        res.status(200).json(Product); 
    } catch (error) {
        res.status(500).json(error); 
    }
});







module.exports = router ; 