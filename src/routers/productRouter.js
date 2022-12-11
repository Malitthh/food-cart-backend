const express = require("express");
const productController = require("../controllers/productController");
const protect = require("../middlewares/protect");

const router = express.Router();

router.route("/").get(productController.getAllProducts);

router.route("/supplier/:id").get(productController.getProductsBySupplier);

router.use(protect); //  protect all router which are comming after this middleware

router.route("/").post(productController.createProduct);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
