const product=require('../../models/productSchema');

const getCategoryWiseProduct = async(req,res)=>{
    try{

        const { category } = req?.body || req?.query;
        const products = await product.find({ category });

        res.json({
            data : products,
            message : "Product",
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getCategoryWiseProduct