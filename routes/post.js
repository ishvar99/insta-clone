const express=require('express')
const _=require('lodash');
let router=express.Router();
const mongoose=require('mongoose');
const Post=mongoose.model('Post');
const isLoggedIn=require('../middlewares/auth')
router.get('/',isLoggedIn,(req,res)=>{
    Post.find({})
    .populate('postedBy','_id name').populate('comments.user','_id name')
    .then((posts)=>{
        res.json({posts});
    })
})
router.get('/me',isLoggedIn,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .then(posts=>res.json(posts))
    .catch(error=>res.json({error}));
})
router.post('/create',isLoggedIn,(req,res)=>{
    const {body,url}=req.body;
    if(!body||!url){
        res.json({'error':'complete all fields!'})
        return;
    }
    req.user=_.pick(req.user,['_id','name','email'])
    const post =new Post({
        body,photo:url,postedBy:req.user
    })
    post.save().then((post)=>{
        post=_.pick(post,['photo','body','postedBy'])
        res.json({'message':'Success!'});
    }).catch((err)=>{
        // console.log(err);
        res.json('error')});
})
router.put('/comment',isLoggedIn,(req,res)=>{
    const {postId}=req.body;
    const {comment}=req.body;
    Post.findOneAndUpdate(
        {_id:postId},
       { $push:{'comments':{text:comment,user:req.user._id}}}
    ,{new:true}).populate('postedBy','_id name').populate('comments.user','_id name').exec(function(err,data){
    if(err)
        console.log(err);
    console.log(data);
    res.json(data)        
})
})
router.put('/like',isLoggedIn,(req,res)=>{
    const {postId}=req.body;
    Post.findOneAndUpdate(
        {_id:postId},
       { $addToSet:{'likes':req.user._id}}
    ,{new:true}).populate('postedBy','_id name').populate('comments.user','_id name').exec(function(err,data){
    if(err)
        console.log(err);
    console.log(data);
    res.json(data)        
})
})
router.put('/unlike',isLoggedIn,(req,res)=>{
    const {postId}=req.body;
    Post.findOneAndUpdate(
        {_id:postId},
       { $pull:{'likes':req.user._id}}
    ,{new:true}).populate('postedBy','_id name').populate('comments.user','_id name').exec(function(err,data){
    if(err)
        console.log(err);
    console.log(data);
    res.json(data)        
})
})  

module.exports=router