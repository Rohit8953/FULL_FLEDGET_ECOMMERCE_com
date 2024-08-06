const addtocart=require('../../models/addtocart');

exports.addtocart=async(req,res)=>{
    try{

        const {userId,id}=req.body;
        console.log("user details form backend",userId,id);
        const isProductId=await addtocart.findOne({productId:id});
        console.log("THIS PRODUCT IS ALREADY MARK TO ADD ---->",isProductId)
        
        if(isProductId){
            console.log("THIS PRODUCT IS ALREADY MARK TO ADD")
            return res.status(201).json({
                success:true,
                message:'add to cart already exist'
            })
        }

        const data=await addtocart.create({
            productId:id,
            userId:userId,
            quantity:1,
        }) 

        return res.status(201).json({
            success:true,
            data,
            message:'add to cart success'
        })
        
    }catch(error){
        console.log("Error aya hai please handle it ",error);
        return res.status(401).json({
            success:false,
            message:'add to cart unsuccess'
        })
    }
    
}