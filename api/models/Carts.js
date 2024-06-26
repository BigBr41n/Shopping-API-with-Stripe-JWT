const mongoose = require('mongoose'); 



const cartSchema = mongoose.Schema({
    userID : {
        type : String , 
        required : true,
    }, 

    products : [
        {
            productID : {
                type : String , 
            }, 
            qunatity : {
                type : Number , 
                default : 1 ,
            },
        },
    ]
},{timestamps : true}); 




module.exports = mongoose.model('Cart' , cartSchema);