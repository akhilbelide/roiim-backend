const express=require('express')
const router=express.Router()

const payapiController=require('../controllers/payapi')

router.post('/',payapiController.postPayment)

module.exports = router;