//imports 
const express = require('express'); 


//routes imports
const userRoute     = require('./api/routes/users'); 
const productRoute  = require('./api/routes/product'); 
const cartRoute     = require('./api/routes/cart'); 
const orderRoute    = require('./api/routes/order'); 
const AuthRoute     = require('./api/routes/auth');
const PaymentRoute = require('./api/routes/strip') 





//connecting to DB 
const connect = require('./api/config/db_conf') ; 
connect(); 




//the main express app 
const app = express() ; 




//middlewars 
app.use(express.json()); 





//ROUTES 
app.use("/api/v1/user" , userRoute); 
app.use("/api/v1/product" , productRoute);
app.use("/api/v1/cart" , cartRoute);
app.use("/api/v1/order" , orderRoute);
app.use("/api/auth" , AuthRoute); 
app.use("/api/v1" , PaymentRoute); 









//handle any route does not exists 
app.use((req , res , next)=>{
    const error = new Error('404'); 
    error.status = 404 ; 
    next(error); 
}); 



app.use((error , req , res , next)=>{
    res.status(400).json({
        error : {
            message : error.message 
        }
    })
}); 




//exporting to use it in the server file
module.exports = app ; 