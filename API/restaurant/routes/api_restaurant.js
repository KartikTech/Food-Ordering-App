const express = require('express');
const controller = require('../controller/restaurant')

const router = express.Router();

router.post('/',controller.addRestaurant);

router.get('/',controller.getRestaurant);

router.get('/mealtype',controller.getMealType);

router.get('/location',controller.getLocation);

router.post('/filter',controller.getByFilter);

router.get('/location/:location',controller.getRestaurantByLocation);

router.get('/search/:name',controller.getRestaurantByName);

router.get('/:id',controller.getRestaurantById);

// router.get('/:city/:name',controller.getRestaurantByCityAndName)

router.put('/',controller.updateRestaurant);

router.delete('/:id',controller.deleteRestaurant);

module.exports= router;