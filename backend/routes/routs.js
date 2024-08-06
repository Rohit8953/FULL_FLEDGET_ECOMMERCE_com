const express=require('express');
const router=express.Router();

//user import is there-------->>>>>>>>>>>>
const {Auth}=require('../middleware/auth')
const {signup,login, logout}=require('../controllers/user/signInLogin')
const {allusers}=require('../controllers/user/allUsers')
const{updatuser}=require('../controllers/user/UpdateUser')

//product import is there-------->>>>>>>>>>>>
const{updateproduct}=require('../controllers/Product/updateProduct')
const{allproducts}=require('../controllers/Product/getallProduct')
const {uploadproduct}=require('../controllers/Product/uploadProduct')
const{getCategoryProduct}=require('../controllers/Product/getcategory')
const getCategoryWiseProduct=require('../controllers/Product/getcategoryWiseProduct');
const {productdetails} =require('../controllers/Product/ProductDetails');
const { addtocart } = require('../controllers/addtocart/addtocart');
const { addtocartProduct } = require('../controllers/addtocart/addtocartProduct');
const {countaddtocart} = require('../controllers/addtocart/addtocartCount');
const { deleteAddToCart } = require('../controllers/addtocart/deletaddtocart');
const { searchproduct } = require('../controllers/Product/searchProduct');
const { filterproduct } = require('../controllers/Product/filterProduct');
const { makepayment } = require('../controllers/addtocart/makepayments');
const { deleteProduct } = require('../controllers/Product/deleteProduct');
const { genrateOtp, checkotp, updatePassword, otpandemailing } = require('../controllers/user/Otp');


//user----------------->>>>>>>>>>>>>
router.post('/signup',signup);
router.post('/login',login);
router.get('/logout',logout);
router.get('/allusers',Auth,allusers, (req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});
router.post('/updateRole',Auth,updatuser, (req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});


//Product------->>>>>>>>>>>>>>>>>>>>

router.post('/uploadProduct',Auth,uploadproduct,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});
router.get('/allproducts',Auth,allproducts,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});
router.post('/updatedproduct',Auth,updateproduct,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});
router.get('/getcategory',getCategoryProduct,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});
router.post('/getCategoryWiseProduct',getCategoryWiseProduct,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});
router.get('/product/:id',productdetails,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});

// add to cart ---=-==->
router.post('/addtocart',addtocart,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});

router.post('/addtocartproduct',addtocartProduct,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});
router.post('/countupdate',countaddtocart,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});
router.post('/deleteaddtocartproduct',deleteAddToCart,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});
router.get('/search',searchproduct,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});
router.post('/filterproduct',filterproduct,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});

router.post('/create-checkout-session',makepayment,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});

router.post('/product-delete',deleteProduct,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});
router.post('/otp',genrateOtp,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});
router.post('/verifyotp',checkotp,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});

router.post('/updatePassword',updatePassword,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});

router.get('/otpandemail',otpandemailing,(req,res)=>{
    return res.json({
        success:true,
        message:'👍👍👍👍👍'
    })
});

module.exports=router;