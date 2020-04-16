const express=require("express")
const PORT=3000;
let app=express();
app.get('/',(req,res)=>{
    res.send("WELCOME TO INSTAGRAM")
})

app.listen(PORT,()=>console.log(`APPLICATION IS RUNNING AT http://localhost:${PORT}`));