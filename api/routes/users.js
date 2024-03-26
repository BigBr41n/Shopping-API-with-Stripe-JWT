//Router
const router = require('express').Router();
const {verfiyTokenAndAutho, verfiyTokenAndAdmin} = require('../middleware/verifyToken'); 
const User = require('../models/User'); 







router.put('/:id' , verfiyTokenAndAutho ,  async (req , res)=>{
    try {
        if(req.body.password){
            req.body.password = await bcrypt.hash(password , 10); 
        }

        const updatedUser = await User.findById(req.params.id , {
            $set : req.body , 
        } , {new : true}); 

        res.status(200).json(updatedUser); 
    } catch (error) {
        res.status(500).json(error); 
    }
}); 









router.delete('/:id' ,verfiyTokenAndAutho, async (req,res)=>{
    try {
        await User.findByIdAndRemove(req.params.id); 
        res.status(200).json({message : "deleted"}); 
    } catch (error) {
        res.status(500).json(error); 
    }
});








router.get('/:id' ,verfiyTokenAndAutho, async (req,res)=>{
    try {
        const user = await User.findById(req.params.id); 
        res.status(200).json(user); 
    } catch (error) {
        res.status(500).json(error); 
    }
});







router.get('/all' ,verfiyTokenAndAutho, async (req,res)=>{
    try {
        //return the latest 5 users (newest) using query param "new" 
        const query = req.query.new ; 
        const users = query ? await User.find().sort({_id : -1 }).limits(5) : await User.find(); 
        res.status(200).json(users); 
    } catch (error) {
        res.status(500).json(error); 
    }
});







router.get('/status' , verfiyTokenAndAdmin , async (req , res)=>{
    const date = new Date() ;  
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1)); 


    try {
        
        const data = await User.aggregate([
            {$match : {createdAt : {$gte : lastYear}}},
            {
                $project:{
                    month :{$month : "createdAt"},
                },
            },
            {
                $group:{
                    _id : "$month" ,
                    total:{$sum : 1}, 
                }
            }
        ]);
        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({errr : error});
    }
}); 


















module.exports = router ; 