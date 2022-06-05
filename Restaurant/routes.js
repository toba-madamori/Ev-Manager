const router = require('express').Router()
const validator = require('express-joi-validation').createValidator({})
const { createRestaurant, getRestaurant, updateRestaurant, deleteRestaurant, rateRestaurant, searchRestaurants } = require('./controllers')
const { createRestaurantSchema } = require('../Utils/validation')
const authMiddleware = require('../Middleware/authentication')

router.post('/create',authMiddleware,validator.body(createRestaurantSchema), createRestaurant)
router.get('/get', getRestaurant)
router.patch('/update',authMiddleware, updateRestaurant)
router.delete('/delete',authMiddleware, deleteRestaurant)
router.patch('/rate', rateRestaurant)
router.get('/search', searchRestaurants)

module.exports = router;
