const express = require('express');
const vehicleController = require('../controllers/vehicleController');
const protect = require('../middlewares/protect');

const router = express.Router();

router.use(protect); //  protect all router which are comming after this middleware

router.route('/')
    .get(vehicleController.getAllVehicles)
    .post(vehicleController.createVehicle);

router.route('/:id')
    .get(vehicleController.getVehicle)
    .patch(vehicleController.updateVehicle)
    .delete(vehicleController.deleteVehicle);

module.exports = router;
