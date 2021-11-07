const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    religion:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
     type:String,
     default:"https://res.cloudinary.com/dm36weewi/image/upload/v1630596425/5311083-middle_glqrak.png"
    },
    
})

mongoose.model("User",userSchema)