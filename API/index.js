const express = require('express');
const restaurantRoutes = require('./restaurant/routes/api_restaurant');
const menuRoutes = require('./restaurant/routes/api_menu');
const userRoutes = require('./user/routes/api_user')
const paymentRoutes = require('./restaurant/routes/api_payment')
const parser = require('body-parser');
const mongodb = require('./config/mongodb');
const cors = require('cors');

mongodb.connect();

const server = express();
server.use(cors());
server.listen('3200');

server.use(parser.json());

server.use("/api/restaurant",restaurantRoutes);
server.use("/api/menu",menuRoutes);
server.use("/api/user",userRoutes);
server.use("/api",paymentRoutes);

server.get("/",(req,res)=>{
    res.send("Hello from Express server.");
});

console.log("server is running on port 3200");