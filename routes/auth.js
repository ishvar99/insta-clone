const express=require('express')
let router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model('User');
router.get('/',(req,res)=>{
    res.send('Hello from auth')
})
router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body;
      if(!name || !email || !password){
          return res.status(422).json({error:'Complete all the fields'});
        }
      User.findOne({email}).then((savedUser)=>{
          if(savedUser) return res.status(400).json({error:'email already exists'})
          const user=new User({
                name,email,password
            });
            user.save().then(()=>{
                res.json({message:'user saved to database'})
            }).catch(err=>res.json({error:err}))
      }).catch((err)=>console.log(err));
})
module.exports=router;