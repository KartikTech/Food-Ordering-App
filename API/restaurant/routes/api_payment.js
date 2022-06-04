const express = require('express');
const controller = require('../controller/payment')
const router = express.Router();

router.post("/payment",controller.payment);
router.post('/callback',controller.callback);
module.exports=router;