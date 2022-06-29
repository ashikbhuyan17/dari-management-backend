const express = require('express')
const { createPurchase, getPurchase, getPurchaseAll, deletePurchase } = require('../controller/purchase')
const router = express.Router()

router.post('/create', createPurchase)
router.get('/getPurchase', getPurchaseAll)
router.delete('/deletePurchase/:id', deletePurchase)
router.get('/getPurchase/:purchase_type', getPurchase)

module.exports = router