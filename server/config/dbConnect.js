const mongoose = require('mongoose');


         function dbConnection() {
mongoose.connect(process.env.MONGO_URI,()=>{
     try{
          console.log("DB connect successfuly")
     }catch(err){
          console.log("DB connect failed", err)

     }
})}

module.exports = dbConnection
