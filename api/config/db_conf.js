const mongoose = require('mongoose'); 
require('dotenv').config() ; 


//function to connect with a local db (on my pc); 
const connect = ()=>{
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.DB_URI);
        const db = mongoose.connection; 
        db.on('error' , ()=> console.log(error)); 
        db.once('open' , ()=> console.log("db connected")); 
    } catch (error) {
        console.log(error); 
    }
}; 



module.exports = connect ;


