const mongoose=require('mongoose');
require('dotenv').config();

  const connection=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
      connectTimeoutMS: 10000, 
    })
    .then(()=>{console.log("db connection successfyll----")})
    .catch((err)=>{
          console.log("db connection unsuccessful",err);
          process.exit(1);
        })
  }
  module.exports=connection;
