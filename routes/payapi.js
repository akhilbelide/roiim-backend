const express=require('express')

const router=express.Router()


const payapiController=require('../controllers/payapi')

router.post('/',payapiController.postPayment)
router.get('/test',payapiController.getTest)


module.exports = router;