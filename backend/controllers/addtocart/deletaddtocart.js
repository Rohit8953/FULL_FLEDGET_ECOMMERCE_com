const addtocart = require("../../models/addtocart");

exports.deleteAddToCart=async(req,res)=>{
        try {
             
             const {_id}=req.body;
             console.log("id is ....",_id);
             const deletedproduct=await addtocart.findOneAndDelete({_id:_id});
             return res.status(201).json({
                 success:true,
                 deletedproduct,
                 message:'product deletion successfuly from add to cart....'
            })
        } catch (error) {
            console.log("Rohit bbhai error aya hai",error)
            return res.status(401).json({
                 success:false,
                 message:'Error during product deletion from add to cart....'
            })
            
        }
}