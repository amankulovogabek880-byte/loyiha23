const router = require('express').Router();
const controller = require('../controllers/leadController');

router.get('/', controller.getLeads);
router.post('/', controller.createLead);

module.exports = router;
