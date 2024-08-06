const product=require('../../models/productSchema');

exports.getCategoryProduct=async(req,res)=>{

    try {
        
        const products=await product.distinct("category");
        console.log("product category are",products);
        const productCategory=[];
        
        for(const category of products){
            const categoryproduct=await product.findOne({category});
            
            if(categoryproduct){
                productCategory.push(categoryproduct)
            }

        }

        return res.status(201).json({
            data:productCategory,
            success:true,
            message:'all category is there'
        })

    }
    catch(error){
        console.log("Error is there->",error);
        res.status(401).json({
            success:false,
            message:'Error aya hai during Category'
        })
    }

}