const addtocart=require('../../models/addtocart');

const countAddToCartProduct = async(req,res)=>{
    try{
        const userId = req.body;
        const count = await addtocart.countDocuments({
            userId : userId
        })
        
        return res.status(201).json({
            count,
            success:true,
            message:'ok'
        })
    }catch(error){
        return res.status(201).json({
            success:false,
            message:'not ok'
        })
    }
}

module.exports = countAddToCartProduct