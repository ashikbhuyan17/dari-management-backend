const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { signup, signIn } = require('../controller/auth')
const { check } = require('express-validator');
const { validateSignupRequest, validateSignInRequest, isRequestValidated } = require('../validators/auth');
const { requireSignIn } = require('../common-middleware');


router.post('/signin', validateSignInRequest, isRequestValidated, signIn)

router.post('/signup', validateSignupRequest, isRequestValidated, signup)

router.post('/profile', requireSignIn, (req, res) => {
    // console.log(req.headers);
    // User.findAll()
    router.post('/category/create', requireSignIn, addCategory)

})


router.get('/', (req, res) => {
    res.send('this is auth page')
})


module.exports = router;