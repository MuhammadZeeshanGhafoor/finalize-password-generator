const app = require('express').Router();





const User = require("../models/user")

app.post("/register",(req, res)=>{
     User.findOne({email: req.body.email}, (err, user)=>{
          if(err){
          res.send({error: "user not exist"})
          }else{
               if(user){
                    res.statusCode = 400;
                    res.send({error: 'Email already registered'})
               }else{
                    const user = new User(req.body);
                    user.save((err, userRes)=>{
                         if(err){
                              res.send({error: err.message || " failed to save user" })
                         }else{
                              res.send({message: "user successfully registeres"})
                         }
                    })
               }
          }
     })
     
})

app.post('/login', (req, res)=>{
     console.log('requesting',req.body)
     User.findOne({email: req.body.email},(err, user)=>{
          // console.log(req.body)
          // console.log(req.headers)
          // console.log("token", generateToken())
          // console.log("---request--in--backend---")
         if(err){
          res.send({err, messgae: "error while login ", status: 400})
         }else{
          if(user){
               if(user.email == req.body.email){
                    if(user.password == req.body.password){
                         let newUser = user.toJSON()
                         res.send({user:newUser, message:"success"})
                    }else{
                         res.send({message:"invalid password", status: 404})
                    }
               }else{
                    res.send({status:404, message: "invalid email"})
               }
          }else{
               res.send({message:"user not found"})
          }
         }
     })
})

          app.get("/getUser", (req, res)=>{
const JWT_SECRET = process.env.SECRET;
               // console.log("------------------------------------------------------")
               // console.log({ req: req.header("Authorization") })
               // console.log("------------------------------------------------------")

               const decode = jwt.verify(
                    req.header("Authorization").split(" ")[1],
                    JWT_SECRET
                  );
               //    console.log(decode)
               User.findById(decode, (err, result)=>{
                    if(err){
                         console.log(err)
                    }else{
                         let user = result.toJSON()
                         delete user.password
                         res.send({user})
                         console.log(result)
                    }
               })
          })

module.exports = app