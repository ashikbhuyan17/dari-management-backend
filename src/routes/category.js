const express = require('express')
const router = express.Router()
const Category = require('../models/category')
const { addCategory, getCategories, deleteCategories, test } = require('../controller/category')
const { requireSignIn, adminMiddleware, userMiddleware } = require('../common-middleware')

router.post('/create', requireSignIn, addCategory)
router.get('/getCategory', getCategories)
router.delete('/deleteCategory/:id', deleteCategories)
router.get('/category', test)



module.exports = router
