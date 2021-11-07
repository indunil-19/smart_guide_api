const mongoose = require('mongoose')
const provinceSchema = new mongoose.Schema({
    pid:{
        type:String,
    },
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    
    images:[{
     type:String,
     default:"https://res.cloudinary.com/dm36weewi/image/upload/v1630596425/5311083-middle_glqrak.png"
    }
    ]
})

mongoose.model("Province",provinceSchema)