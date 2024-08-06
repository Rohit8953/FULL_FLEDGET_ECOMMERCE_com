const product=require('../../models/productSchema')


exports.searchproduct=async(req,res)=>{
try {

        const query = req.query.query;

        const regex = new RegExp(query,'i','g') 
        const Searchproduct = await product.find({
            "$or" : [
                {
                    productName : regex
                },
                {
                    category : regex
                }
            ]
        })

        console.log("JADH",Searchproduct)
        
       return res.status(200).json({
            data  : Searchproduct ,
            message : "Search Product list",
            success : true
        })
}catch (error) {
    console.log("Error aya hai",error);
    return res.status(200).json({
        data  : product ,
        message : "Search Product list",
        success : false
    })
}
} 