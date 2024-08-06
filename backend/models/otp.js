const mongoose=require('mongoose');

const otpSchema=mongoose.Schema({
    
    email:{
        type:String,
        require:true
    },
    otp:{
        type:String,
        require:true
    },
    expireIn:{
        type:Number,
        require:true
    }
 },
    {
       timestamps:true
    }
)
module.exports=mongoose.model("OTP",otpSchema)
