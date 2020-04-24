const mongoose=require('mongoose');

const postSchema =new mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    likes:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:'User'}
    ],
    comments:[
    {
        text:String,
        user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        }
    }
            ],
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

mongoose.model('Post',postSchema);