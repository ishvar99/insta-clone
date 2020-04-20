const express=require('express')
const _=require('lodash');
let router=express.Router();
const mongoose=require('mongoose');
const Post=mongoose.model('Post');
const isLoggedIn=require('../middlewares/auth')
router.get('/',isLoggedIn,(req,res)=>{
    Post.find({})
    .populate('postedBy','_id name')
    .then((posts)=>{
        res.json({posts});
    })
})
router.get('/me',isLoggedIn,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .then(posts=>res.json(posts))
    .catch(error=>res.json({error}));
})
router.post('/create',(req,res)=>{
    const {title,body,url}=req.body;
    req.user=_.pick(req.user,['_id','name','email'])
    const post =new Post({
        title,body,photo:url,postedBy:req.user
    })
    post.save().then((post)=>{
        post=_.pick(post,['title','photo','body','postedBy'])
        res.json({post});
    }).catch((err)=>res.json('error'));
})

module.exports=router