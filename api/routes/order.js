//Router
const router = require('express').Router();
const {verfiyTokenAndAutho, verfiyTokenAndAdmin, verfiyToken} = require('../middleware/verifyToken'); 
const Order = require('../models/Order');







router.post('/' , verfiyToken , async (req , res)=>{
    try {
        const newOrder = new Order(req.body); 
        const saved = await newOrder.save(); 

        res.status(200).json(saved); 

    } catch (error) {
        res.status(500).json({message : error}); 
    }
});





//updating a order
router.put('/:id' , verfiyTokenAndAdmin , async (req , res)=>{
    try {
        const {id} = req.params; 

        const updatedOrder= await Order.findByIdAndUpdate(id , {
            $set : req.body , 
        } , {new : true}); 


        res.status(200).json(updatedOrder); 
    } catch (error) {
        res.status(500).json({message : error}); 
    }
});







router.delete('/:id' , verfiyTokenAndAdmin , async (req , res)=>{
    try {
        const {id} = req.params; 

        await Order.findByIdAndRemove(id); 


        res.status(200).json({message : "deleted"}); 
    } catch (error) {
        res.status(500).json({message : error}); 
    }
});






router.get('/:id' , async (req,res)=>{
    try {
        const order = await Order.findById(req.params.id); 
        res.status(200).json(order); 
    } catch (error) {
        res.status(500).json(error); 
    }
});








module.exports = router ; 