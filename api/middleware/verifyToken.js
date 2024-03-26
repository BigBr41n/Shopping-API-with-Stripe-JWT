const jwt = require('jsonwebtoken'); 
require('dotenv').config(); 




const verfiyToken = (req , res , next)=>{
    try {
        const authHeader = req.headers.token ; 
        if(!authHeader){
            res.status(401).json({message : "unauth"}); 
        }

        else {
            const token = authHeader.split(" ")[1]; 
            jwt.verify(token , process.env.JWT_SECRET , (err , user)=>{
                if(err) res.status(403).json({message : "invalid token"}); 
                req.user = user ; 
                next(); 
            }); 
        }
    } catch (error) {
        res.status(500).json({message : "internal server error"}); 
    }
}




const verfiyTokenAndAutho = (req , res , next)=>{
    verfiyToken(req , res , ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next() ; 
        }else {
            res.status(403).json({message : "not allowed"}); 
        }
    }) ; 
}; 



const verfiyTokenAndAdmin= (req , res , next)=>{
    verfiyToken(req , res , ()=>{
        if(req.user.id = req.user.isAdmin){
            next() ; 
        }else {
            res.status(403).json({message : "not allowed"}); 
        }
    }) ; 
}; 


module.exports =  {verfiyToken , verfiyTokenAndAutho , verfiyTokenAndAdmin}; 