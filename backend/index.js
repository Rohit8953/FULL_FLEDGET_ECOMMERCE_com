const express = require("express"); //import express through require;
const app = express(); //create server
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const porthai = process.env.PORT || 2000;

// Stripe---payment
const stripe = require("stripe")(
  "sk_test_51Ph7haRxahYVGxLcIxIW7dmeOS7dvmnzuZfKG0n4sgUrOtzPdCHY1hFLesfeNKf7OapkowXfs4VMZzWvqCAsg5fP008VkWSV5Z"
);

//it is middleware taki mai request ke body me se json data find kar paun

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000", 
  "https://full-fledget-ecommerce-com-6svy.vercel.app", 
  "https://full-fledget-ecommerce-com.vercel.app"
];
const corsOption = {
  origin: "https://full-fledget-ecommerce-com-6svy.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOption));

const routs = require("./routes/routs");
app.use("/api/v1", routs);

app.options('*', cors(corsOption));

app.listen(porthai, () => {
  console.log(`app listening on port no..http://localhost:${porthai}`);
});

//db connection is required to connection between app and database;
const dbconnection = require("./config/database");
dbconnection(); //fxn call;

app.get("/", (req, res) => {
  res.send("Backend code running successfuly");
});
