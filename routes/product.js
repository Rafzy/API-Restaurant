const express = require('express')
const router = express.Router()
const multer = require('multer')
const controller = require('../controller/IndexController')

const storageFood = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/foods')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const storageDrink = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/drinks')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const uploadFoods = multer({ storage: storageFood, limits: { fieldSize: 1024 * 1024 * 10 } })
const uploadDrinks = multer({ storage: storageDrink, limits: { fieldSize: 1024 * 1024 * 10 } })

router.get('/foods', controller.ProductController.getAllDataFood)
router.post('/create-food', uploadFoods.single('image'), controller.ProductController.createFood)
router.put('/update-food', controller.ProductController.updateFood)
router.delete('/delete-food', controller.ProductController.deleteFood)

// <-- Router Section Drinks -->
router.get('/drinks', controller.ProductController.getAllDataDrink)
router.post('/create-drink', uploadDrinks.single('image'), controller.ProductController.createDrink)
router.put('/update-drink', controller.ProductController.updateDrink)
router.delete('/delete-drink', controller.ProductController.deleteDrink)

module.exports = router
