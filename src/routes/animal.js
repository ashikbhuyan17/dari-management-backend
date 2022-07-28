const express = require('express')
const router = express.Router()
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')

const { createAnimal, getAnimal, categoryByGetAnimal, deleteAnimal, userByGetAnimal } = require('../controller/animal')
const { requireSignIn, adminMiddleware } = require('../common-middleware')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage })


// router.post('/animal/create', requireSignIn, adminMiddleware, upload.single('animal_picture'), createAnimal)
router.post('/create', requireSignIn, upload.array('animal_picture'), createAnimal)
// router.post('/animal/create', requireSignIn, adminMiddleware, createAnimal)

router.get('/getAnimal', getAnimal)
router.get('/getCategory/:id', categoryByGetAnimal)
router.get('/userGetAnimal/:id', userByGetAnimal)
router.delete('/deleteAnimal/:id', deleteAnimal)



module.exports = router

