const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    userImage:{
        type:String,
    },
    role:{
        type:String,
        require:true
    }
},{
    timestamps:true
})
module.exports=mongoose.model("User",userSchema)