const express = require('express');
const { recordSale, getSales,getSalesForDay } = require('../controllers/saleController');

const router = express.Router();

router.post('/', recordSale);
router.get('/', getSales);
router.get('/day/:date', getSalesForDay);

module.exports = router;
