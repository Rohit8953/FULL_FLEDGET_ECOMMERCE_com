const mongoose=require('mongoose');

const addtocartSchema=new mongoose.Schema({
    productId :{
        type:String,
        ref:"ProductUpload"
    },
    quantity :{
        type:Number,
        require:true
    },
    userId :{
        type:String,
        require:true
    }
});
module.exports=mongoose.model("addtocart",addtocartSchema)