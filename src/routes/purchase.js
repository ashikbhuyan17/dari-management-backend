const express = require('express')
const { createPurchase, getPurchase, getPurchaseAll } = require('../controller/purchase')
const router = express.Router()

router.post('/create', createPurchase)
router.get('/getPurchase', getPurchaseAll)
router.get('/getPurchase/:purchase_type', getPurchase)

module.exports = router