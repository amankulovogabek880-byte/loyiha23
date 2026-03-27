const router = require('express').Router();
const controller = require('../controllers/expenseController');

router.get('/', controller.getExpenses);
router.post('/', controller.createExpense);
router.delete('/:id', controller.deleteExpense);

module.exports = router;
