const express=require('express')
const axios=require('axios')
const config=require('./config')

exports.postCreateCust=(req,res,next) => {
    const refnum=req.body.data.merchantRefNum

    axios.get('https://api.test.paysafe.com/paymenthub/v1/customers?merchantCustomerId='+ refnum, {
        headers: {
            'Authorization':'Basic ' + config.key,
            'Content-Type':'application/json'
        }
    })
    .then(res=>{
        if(res.statsCode==201){
            const custId=res.body.id
            axios.post('https://api.test.paysafe.com/paymenthub/v1/customers/'+custId+'/singleusecustomertokens',{
                "merchantRefNum": refnum,
                "paymentTypes": [
                  "CARD"
                ]
              },{
                headers: {
                    'Authorization':'Basic ' + config.key,
                    'Content-Type':'application/json'
                }
              }).then(res=>{
                  if(res.statusCode==200){
                    res.status(200).json({
                        message:'successful',
                        token:res.data.singleUseCustomerToken,
                        id:res.data.id
                    })
                  }
              }).catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))
}