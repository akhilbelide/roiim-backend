const express=require('express')

const router=express.Router()


const payapiController=require('../controllers/payapi')

router.post('/',payapiController.postPayment)
router.post('/test',payapiController.getTest)


module.export=router