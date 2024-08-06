const User=require('../../models/userSchema')
exports.updatuser=async(req,res)=>{
      try {
         const {id,userRole}=req.body;
         console.log("role is ",userRole,"id is",id);
         const payload={
            ...(userRole && {role:userRole}),
         }
         const prevUser=await User.findById(id)
         console.log("prevuser is",prevUser);

         if (prevUser.role==='general'||prevUser.role==='admin'){
             var user=await User.findByIdAndUpdate(id,payload);
         }
        return res.status(202).json({
            success:true,
            user:user,
            message:'uptade successfull....'
        })
      }catch(error){
          console.log("error aya hai",error)
          return res.status(402).json({
            success:false,
            message:'uptade Unsuccessfull....'
        })
      }
}