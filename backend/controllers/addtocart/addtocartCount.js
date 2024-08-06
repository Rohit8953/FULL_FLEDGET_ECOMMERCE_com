const addtocart = require("../../models/addtocart");

exports.countaddtocart=async(req,res)=>{
    try {
        const {productId}=req.body;
        const {quantity} = req.body;
        console.log("productid and quantity is there",productId,quantity);
        const updatedaddtocart=await addtocart.updateOne({_id:productId},{
            ...(quantity && {quantity:quantity})
        })
        return res.status(201).json({
            success:true,
            updatedaddtocart,
            message:'count problem please check it and fix it--->'
        })
    }catch (error) {
        console.log("Error aya hai bhai please jaldi check karo---->>>",error);
        return res.status(401).json({
            success:true,
            message:'count problem please check it and fix it--->'
        })
    }
}