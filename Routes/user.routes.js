const express = require('express')
const router = express.Router()
const {Register, signin, getDashboard} = require('../Controller/user.controller')

router.post('/register',Register)
router.post('/signin', signin)
router.get('/dashboard', getDashboard)


module.exports= router 
