const mongoose = require('mongoose'); 



const orderSchema = mongoose.Schema({
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
    ], 
    amount : {
        type :String , 
        required : true , 
    }, 
    adress : {
        type : Object , 
        required : true , 
    }, 
    staus : {
        type : String , 
        default : "pandeing" , 
    }, 
},{timestamps : true}); 




module.exports = mongoose.model('Order' , orderSchema);