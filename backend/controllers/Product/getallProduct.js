const product=require('../../models/productSchema');

exports.allproducts=async(req,res)=>{
    try {
        const allproduct=await product.find().sort({createdAt:-1});

        return res.status(201).json({
            success:true,
            products:allproduct,
            message:'getting all products successfuly'
        })
        
   } catch (error) {
       console.log('Error is there and handle it now',error)
       return res.status(201).json({
        success:false,
        message:'getting all products unsuccessfuly'
    })
   }
}