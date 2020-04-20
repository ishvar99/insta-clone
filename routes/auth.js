const express=require('express')
let router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../keys')
const isLoggedIn=require('../middlewares/auth')
router.get('/protected',isLoggedIn,(req,res)=>{
    const user=req.user;
    res.send(`Welcome, ${user.name} to Instagram!`);
})
router.get('/',(req,res)=>{
    res.send('Hello from auth')
})
router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    console.log(email,password);
    if(!email || !password){
        return res.status(422).json({error:'Complete all the fields'});
      }
    User.findOne({email}).then((user)=>{
        bcrypt.compare(password,user.password).then((response) => {
            if(!response)
                return res.status(422).json({error:'Invalid Email or Password!'})
            const token=jwt.sign({_id:user._id},JWT_SECRET);
            res.json({message:"Success!",token});
        });
    }).catch((err)=>{
        return res.status(422).json({error:'Invalid Email or Password!'});
    })
})
router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body;
      if(!name || !email || !password){
          return res.status(422).json({error:'Complete all the fields'});
        }
      User.findOne({email}).then((savedUser)=>{
          if(savedUser) return res.status(400).json({error:'email already exists'})
          bcrypt.hash(password,12).then((hash)=>{
            const user=new User({
                name,email,password:hash
            });
            user.save().then(()=>{
                res.json({message:'Success!'})
            }).catch(err=>{
                res.json({error:"Error!"})
            })
          });
      }).catch((err)=>console.log(err));
})
module.exports=router;