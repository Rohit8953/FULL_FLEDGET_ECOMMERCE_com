const addtocart = require("../../models/addtocart");

exports.addtocartProduct=async(req,res)=>{
       try {
           const {userId}=req.body;
           console.log("aj;asfqfq3ef",userId)
           const addtocartproduct=await addtocart.find({userId:userId}).populate("productId");

            console.log("addtocart products is here",addtocartproduct);
                return res.status(201).json({
                    success:true,
                    addtocartproduct,
                    message:'add to cart already exist'
                })    
       } catch(error){
           console.log("Error aya hai ji check karo",error);
           return res.status(201).json({
                success:true,
                message:'add to cart already exist'
           })
       }
}
