const express = require('express');
const controller = require('../controller/user');
const router = express.Router();

router.post("/", controller.addUser);
router.post("/login",controller.getUser);

module.exports = router;