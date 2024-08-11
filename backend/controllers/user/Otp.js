const nodemailer = require("nodemailer");
const User=require('../../models/userSchema')
const OTP=require('../../models/otp')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.genrateOtp = async (req, res) =>{
   //generate password---
   try {
      const email=req.body.email;
      if (!email){
         return res.status(500).json({
            success:false,
            message:'Email is not there'
         })
      }
      const existemail=await User.findOne({email:email});
      if (!existemail){
         return res.status(500).json({
            success:false,
            message:'Email is not matched'
         })
      }
      try {
         const data={
             email:email,
         }      
         const otpToken = await jwt.sign(data, process.env.JWT_TOKEN_SECRET, { expiresIn: "1d" });
         console.log("your token is--> You can see fffsefgsdfg", otpToken);
         res.status(201).cookie("otpToken", otpToken,{
             expiresIn: "2d",
             message: "Welcome back",
             success: true
         });
     } catch (error) {
         console.log(error);
     }

      const responses=await OTP.create({
         email:email,
         // otp:otp,
         // expireIn:new Date().getTime()+120*1000
      })

      return res.status(200).json({
          responses,
          success:true,
          message:'Email verifed'
      })

   }catch(error){
      console.log("error is ",error);
      return res.status(500).json({
         success:false,
         message:'Problem occured in otp generation-'
      })
   }
};



exports.otpandemailing=async(req,res)=>{
       try {
         const otps = Math.floor(1000+Math.random()*9000);
         console.log("otp is there",otps);
         const token = req.cookies.otpToken || req.headers.otpToken;

         console.log("token is there",token)

        if (!token || token===undefined) {
            return res.status(401).json({
                success: false,
                message: 'tokem missing from there'
            });
        }
        try {
               var decode = await jwt.verify(token, process.env.JWT_TOKEN_SECRET);
               console.log("Decoded data is there", decode);
               req.User = decode.id;
         } catch (error) {
               console.log("error aya hai during token verification",error);
         }

         console.log("decoded data is there",decode.email);

         let transporter = nodemailer.createTransport({
         service: "gmail", // You can use other services like 'yahoo', 'outlook', etc.
         auth: {
            user: "rc3881425@gmail.com",
            pass:"foua hvxt buuw zhjs" // Your email address
         //   pass: "your-email-password", // Your email password (or app password)
         },
         });

         const response=await transporter.sendMail({
            from: decode.email, // Sender address
            to: decode.email, // List of recipients
            subject: "Hello from Nodemailer", // Subject line
            text: "This is a test email sent using Nodemailer.", // Plain text body
            html: `<h1>See your OTP ${otps}</h1>
            <a href="http://localhost:3000/verifycode">Click here to verify your code</a>`, // HTML body
         })

         const result=await OTP.findOneAndUpdate({email:decode.email},{ otp: otps, expireIn: new Date().getTime() + 120 * 1000 },{ new: true })
         result.save();
         console.log("result is",result)

         return res.status(200).json({
            success:true,
            message:'OTP sent to your email successfully'
        })
         
       } catch (error) {
          console.log("errors",error);
          return res.status(500).json({
            success:false,
            message:'error'
        })
       }
}

exports.checkotp=async(req,res)=>{
   try {
      const otp=req.body.otp;
      console.log("otp is",otp)
      if (!otp) {
         return res.status(500).json({
            success:false,
            message:'OTP is Empty'
         })
      }

      const data=await OTP.findOne({otp:otp})
      console.log("data is",data);
   
      if (!data ||data.otp!==otp|| data.expireIn<new Date().getTime()){
         return res.status(400).json(
            { message: 'Invalid or expired OTP.' }
         );
      }
      
      return res.status(200).json({
         success:true,
         message:'otp verification successfully'
     })  

   } catch (error) {
      console.log("error is ",error);
      return res.status(500).json({
         success:false,
         message:'otp verification problem'
      })
   }
}

exports.updatePassword=async(req,res)=>{
   try {
      
      const {newpassword,confirmPassword}=req.body;
      
      if (!newpassword || !confirmPassword){
         return res.status(400).json({
           success: false,
           message: 'New password and confirm password are required'
         });
       }

       if (newpassword!==confirmPassword) {
         return res.status(400).json({
           success: false,
           message: 'Passwords do not match'
         });
       }
       
      const token = req.cookies.otpToken ;
      console.log("token is",token);

        if (!token || token===undefined) {
            return res.status(401).json({
                success: false,
                message: 'tokem missing from there'
            });
        }
        try {
               var decode = await jwt.verify(token, process.env.JWT_TOKEN_SECRET);
               console.log("Decoded data is there", decode);
               req.User = decode.id;
         } catch (error) {
               console.log("error aya hai during token verification",error);
         }

         const getuser=await User.findOne({email:decode.email})
         
         console.log("email is there",getuser.password);

         const ismatch = await bcrypt.compare(newpassword, getuser.password);
        
         if (ismatch){
             return res.status(404).json({
                 success: false,
                 message: 'Change your password'
             })
         }

         let hashedpassword;
         try {
            hashedpassword = await bcrypt.hash(newpassword, 10); //jisko hash karna chahte ho uska name,10 number of rounds me
            //hash ka matlb password ko encrypt karna in other symbols//
        } catch (err) {
            return res.status(500).json({
                success: false,
                massege: "Error in hashing password",
            });
        }
      
         const Email=decode.email;
         const user=await User.findOneAndUpdate({email:Email},{password:hashedpassword},{ new: true })
         console.log("user is there--=-=-=-",user)
        
         return res.status(200).json({
               success:true,
               message:'password updated'
         })  

   } catch (error) {
      console.log(error)
         return res.status(500).json({
            success:false,
            message:'password not updated'
          })  
   }
}