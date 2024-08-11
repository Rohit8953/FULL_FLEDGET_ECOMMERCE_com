const Product=require('../../models/productSchema');
const User=require('../../models/userSchema')
exports.updateproduct=async(req,res)=>{
    try {
        const{id,data,userId}=req.body;
        const user = await User.findById(userId)
        console.log("User role is there",user?.role);
        
        if(user?.role!=='admin'){
            return res.status(401).json({
                success:false,
                message:'user is not admin'
            })
        }

        const oldProduct=await Product.findById(id);
        const updatedproduct=await Product.findByIdAndUpdate(id,data)
        return res.status(201).json({
            success:true,
            oldProduct:oldProduct,
            newProduct:updatedproduct,
            message:'Product updated successfully'
        })

    } catch (error) {
        console.log("Error is there ->",error)
        return res.status(401).json({
            success:false,
            message:'Product updated unsuccessfully'
        })
    }
}