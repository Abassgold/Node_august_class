const express = require('express')
const router = express.Router()
const {Register, signin, getDashboard, sendMail} = require('../Controller/user.controller')

router.post('/register',Register)
router.post('/signin', signin)
router.get('/dashboard', getDashboard)
router.get('/sendmail', sendMail)



module.exports= router 
