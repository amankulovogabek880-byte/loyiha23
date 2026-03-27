const router = require('express').Router();
const controller = require('../controllers/productController');

router.get('/', controller.getProducts);
router.get('/:id', controller.getProductById);
router.post('/', controller.createProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
