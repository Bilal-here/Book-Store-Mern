// server.js
const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());

require("dotenv").config();
require("./connection/connection");
const router = require("./router/user");
const routers = require("./router/books");
const favRouter = require('./router/favourite');
const cartRouter = require('./router/cart');
const orderRouter = require("./router/order");
const otpRouter = require("./router/otpRouter");  // Import OTP Router

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/", router);
app.use("/books", routers);
app.use("/", favRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use("/otp", otpRouter);  // Use OTP Router for handling OTP-related requests

app.listen(process.env.PORT,'0.0.0.0', () => {
  console.log(`Server is Connected PORT : ${process.env.PORT}`);
});
