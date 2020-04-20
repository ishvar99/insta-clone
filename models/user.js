const mongoose=require('mongoose');
validator=require('validator');
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        validate:{
			validator:(value)=>validator.isEmail(value)
        },
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
mongoose.model('User',userSchema);