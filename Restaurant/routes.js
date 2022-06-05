const router = require('express').Router()
const validator = require('express-joi-validation').createValidator({})
const { createRestaurant, getRestaurant, updateRestaurant, deleteRestaurant, rateRestaurant, searchRestaurants } = require('./controllers')
const { createRestaurantSchema, restaurantID, updateRestaurantSchema } = require('../Utils/validation')
const authMiddleware = require('../Middleware/authentication')

router.post('/create',authMiddleware,validator.body(createRestaurantSchema), createRestaurant)
router.get('/get/:id',validator.params(restaurantID), getRestaurant)
router.patch('/update/:id',authMiddleware,validator.params(restaurantID),validator.body(updateRestaurantSchema), updateRestaurant)
router.delete('/delete/:id',authMiddleware,validator.params(restaurantID), deleteRestaurant)
router.patch('/rate/:id', rateRestaurant)
router.get('/search', searchRestaurants)

module.exports = router;
