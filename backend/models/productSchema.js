const mongoose=require('mongoose');

const productchema=new mongoose.Schema({
    productName :{
        type:String,
        require:true
    },
    brandName :{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    productImage:{
        type:Array,
        default:[]
    },
    description :{
        type:String,
        require:true
    },
    price :{
        type:Number,
        require:true
    },
    sellingPrice :{
        type:Number,
        require:true
    }
},{
    timestamps:true
});
module.exports=mongoose.model("ProductUpload",productchema)