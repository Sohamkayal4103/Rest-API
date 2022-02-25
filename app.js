const express = require("express");
const mongoose = require("mongoose");

const User = require("./model/user");

require("dotenv/config");

const app = express();

app.use(express.json());

// const customMiddleware = (req,res,next) => {
//     console.log("Welcome to my middleware");
//     next();
// }

// app.use(customMiddleware);

app.get("/",(req,res)=>{
    res.send("First Request!!");
})

app.get("/users",(req,res)=>{
    let users=["Mark","Bob","Alice"];
    res.send({
        users:users,
    });
})

app.post("/create_user",async(req,res)=>{
    
    try{
        const myuser = new User(req.body);
        await myuser.save();
        res.send(myuser);
    }
    catch(err){
        res.send({message:err.message});
    }
})

mongoose 
 .connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));



app.listen(3000,()=>{
    console.log("Listening to port 3000");
})