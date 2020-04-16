const express=require('express')
const _=require('lodash');
let router=express.Router();
const mongoose=require('mongoose');
const Post=mongoose.model('Post');
const isLoggedIn=require('../middlewares/auth')
router.post('/create',isLoggedIn,(req,res)=>{
    const {title,body}=req.body;
    req.user=_.pick(req.user,['_id','name','email'])
    const post =new Post({
        title,body,postedBy:req.user
    })
    post.save().then((post)=>{
        post=_.pick(post,['title','photo','body','postedBy'])
        res.json({post});
    }).catch((err)=>console.log(err));
})

module.exports=router