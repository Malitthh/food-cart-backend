const express = require('express');
const orderController = require('../controllers/orderController');
const protect = require('../middlewares/protect');

const router = express.Router();

router.route('/')
    .get(orderController.getAllOrders)

router.use(protect); //  protect all router which are comming after this middleware

router.route('/')
    .post(orderController.createOrder);

router.route('/:id')
    .get(orderController.getOrder)
    .patch(orderController.updateOrder)
    .delete(orderController.deleteOrder);

module.exports = router;
