const express = require('express');
const productController = require('../controllers/productController');
const protect = require('../middlewares/protect');

const router = express.Router();

router.route('/')
    .get(productController.getAllProducts)

router.use(protect); //  protect all router which are comming after this middleware

router.route('/')
    .post(productController.createProduct);

router.route('/:id')
    .get(productController.getProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;
