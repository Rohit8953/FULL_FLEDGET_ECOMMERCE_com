const product=require('../../models/productSchema')
exports.filterproduct=async(req,res)=>{
    try {
        
         const categorylist=req?.body?.category ||[]
         const categoryProduct=await product.find({
            category:{
                    "$in":categorylist
            }
         })
        return res.status(201).json({
            success:true,
            categoryProduct,
            message:'Error aya hai'
        })
        
    } catch (error) {
        console.log("error aya hai........",error)
        return res.status(401).json({
            success:true,
            message:'Error aya hai'
        })
    }
}