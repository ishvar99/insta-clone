const express=require("express");
const mongoose=require("mongoose");
const {MONGOURI}=require('./keys');
const PORT=3000;
let app=express();

mongoose.connect(MONGOURI, { useNewUrlParser: true,useUnifiedTopology: true} );
mongoose.connection.on("connected",()=>console.log("Successfully connected to the database!"))
mongoose.connection.on("error",(err)=>console.log("Failed to connect to database!",err));
app.get('/',(req,res)=>{
    res.send("WELCOME TO INSTAGRAM")
})

app.listen(PORT,()=>console.log(`APPLICATION IS RUNNING AT http://localhost:${PORT}`));