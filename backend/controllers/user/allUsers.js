const User=require('../../models/userSchema')
exports.allusers=async(req,res)=>{
    try {
        const allUsers = await User.find()
        res.status(201).json({
            message : "All User",
            data : allUsers,
            success : true,
            error : false
        })


    } catch (error) {
       console.log("Error aya hai during fetching all users",error)     
    }
}