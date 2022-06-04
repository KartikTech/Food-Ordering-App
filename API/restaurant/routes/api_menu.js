const express = require('express');
const controller = require('../controller/menu');

const router = express.Router();

router.post('/',controller.add);
router.get('/restaurant/:id',controller.getByRestaurantID);

module.exports= router;