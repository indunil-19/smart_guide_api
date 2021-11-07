const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const travelSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    review:{
        type:String
    },
    travelPlan:{
        type:Array,
        required:true,
        default:[[[]],[]]
    },
    start_location:{
        type:Object,
        default:{lat:6.927079,lng:79.857750}
    },
    start_location_name:{
        type:String,
        default:"colombo"
    },
    ownedBy:{
        type:ObjectId,
        ref:"User"
    },
    rate:{
        type:Number
    },
    public:{
        type:Boolean,
        default:false
    }


}, {timestamps:true})

mongoose.model("TravelPlan",travelSchema)