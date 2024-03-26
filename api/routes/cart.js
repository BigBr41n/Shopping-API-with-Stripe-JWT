//Router
const router = require('express').Router();
const { verfiyTokenAndAutho, verfiyTokenAndAdmin } = require('../middleware/verifyToken');
const Cart = require('../models/Carts'); 











router.post('/' ,  async (req , res)=>{
    try {
        const newCart = new Cart(req.body); 
        const cart = await newCart.save(); 

        res.status(200).json(cart); 

    } catch (error) {
        res.status(500).json({message : error}); 
    }
});










router.put('/:id' , verfiyTokenAndAutho, async (req , res)=>{
    try {
        const {id} = req.params; 

        const updatedCart = await Cart.findByIdAndUpdate(id , {
            $set : req.body , 
        } , {new : true}); 


        res.status(200).json(updatedCart); 
    } catch (error) {
        res.status(500).json({message : error}); 
    }
});










router.delete('/:id' , verfiyTokenAndAutho, async (req , res)=>{
    try {
        const {id} = req.params; 

        const deletedCart = await Cart.findByIdAndRemove(id); 


        res.status(200).json({message : "deleted"}); 
    } catch (error) {
        res.status(500).json({message : error}); 
    }
});








router.get('/:userid' , async (req,res)=>{
    try {
        const cart = await Cart.findOne({userId :req.params.userid}); 
        res.status(200).json(cart); 
    } catch (error) {
        res.status(500).json(error); 
    }
});






router.get('/all'  ,verfiyTokenAndAdmin, async (req,res)=>{
   try {
        const carts = await Cart.find(); 
        res.status(200).json(carts);
   } catch (error) {
        res.status(500).json(error);
   }
});







module.exports = router ; 