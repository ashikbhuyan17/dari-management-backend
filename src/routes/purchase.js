const express = require('express')
const { requireSignIn } = require('../common-middleware')
const { createPurchase, getPurchase, getPurchaseAll, deletePurchase } = require('../controller/purchase')
const router = express.Router()

router.post('/create', requireSignIn,createPurchase)
router.get('/getPurchase', getPurchaseAll)
router.delete('/deletePurchase/:id', deletePurchase)
router.get('/getPurchase/:purchase_type', getPurchase)

module.exports = router