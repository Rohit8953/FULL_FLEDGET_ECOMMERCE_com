const product=require('../../models/productSchema')

exports.deleteProduct=async(req,res)=>{
    try {
        const {id}=req.body;
        const response = await product.findOneAndDelete({ _id: id });
        console.log(response)
        return res.status(202).json({
             success:true,
             response,
             message:'Product deletion successful'
        })
    } catch (error) {
        console.log("Error",error);
        return res.status(402).json({
            success:false,
            message:'Product deletion unsuccessful'
       })
    }
}