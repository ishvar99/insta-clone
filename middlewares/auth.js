const mongoose=require('mongoose') 
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../keys')
const User=mongoose.model('User');
module.exports=(req,res,next)=>{
    const token =req.headers.auth;
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        if(err)
            return res.status(401).json({error:'unauthorized user!'});
    
        User.findById(decoded._id).then((user)=>{
            req.user=user;
            next();
        }).catch((err)=>{
            return res.status(401).json({error:'unauthorized user!'});
        })
    })
}