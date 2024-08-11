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

const corsOption = {
  origin: ["http://localhost:3000", "https://full-fledget-ecommerce-com-tq62.vercel.app", "https://full-fledget-ecommerce-com.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOption));

const routs = require("./routes/routs");
app.use("/api/v1", routs);


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin); // Dynamically set origin
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


app.listen(porthai, () => {
  console.log(`app listening on port no..http://localhost:${porthai}`);
});

//db connection is required to connection between app and database;
const dbconnection = require("./config/database");
dbconnection(); //fxn call;

app.get("/", (req, res) => {
  res.send("Backend code running successfuly");
});
