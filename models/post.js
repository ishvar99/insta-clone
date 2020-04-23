const mongoose=require('mongoose');

const postSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    isLiked:{
        type:Boolean,
        default:false
    },
    likes:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:'User'}
    ],
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

mongoose.model('Post',postSchema);