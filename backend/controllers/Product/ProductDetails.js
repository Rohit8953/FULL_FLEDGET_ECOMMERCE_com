const product=require('../../models/productSchema');

exports.productdetails=async(req,res)=>{
    try {
        const {id}=req.params;
        const productdetail=await product.findById(id);
        return res.status(201).json({
            success:true,
            details:productdetail,
            message:'Product find successfuly'
        })
    } catch(error){
        return res.status(401).json({
            success:true,
            message:'Cannot Product find'
        })
    }
}