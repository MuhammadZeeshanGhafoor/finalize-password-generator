const express =  require('express')
const cors = require('cors')
const dbConnection = require('./config/dbConnect')
const userRoutes = require("./routes/users")

const { verifyToken } = require('./config/token')


const app = express()







app.use(cors());
app.use(express.json());
require('dotenv').config();



dbConnection()

app.use('/users',   userRoutes )







app.listen(3001, ()=>{
     console.log("port 3001")
})