const express=require('express')
const router=express.Router()

const createCustomerController=require('../controllers/createcust')

router.post('/',createCustomerController.postCreateCust)

module.exports = router;