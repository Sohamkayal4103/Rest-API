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

 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         // Use the collection "people"
         const col = db.collection("people");
         // Construct a document                                                                                                                                                              
         let personDocument = {
             "name": { "first": "Alan", "last": "Turing" },
             "birth": new Date(1912, 5, 23), // June 23, 1912                                                                                                                                 
             "death": new Date(1954, 5, 7),  // June 7, 1954                                                                                                                                  
             "contribs": [ "Turing machine", "Turing test", "Turingery" ],
             "views": 1250000
         }
         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}
run().catch(console.dir);

app.listen(3000,()=>{
    console.log("Listening to port 3000");
})