const http = require('http'); 
const app = require('./app'); 
require('dotenv').config(); 



//creating the server
const server = http.createServer(app); 



//PORT 
const PORT = process.env.PORT || 4000 ; 





server.listen(PORT , ()=>{
    console.log(`listen on : ${PORT}`); 
})