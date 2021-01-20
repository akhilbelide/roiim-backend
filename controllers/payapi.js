const { default: axios } = require('axios')
const request=require('request')


const headers={
    'Content-Type': 'application/json',
    'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4'
    }


exports.postPayment=(req,response,next)=>{

    axios.post(
                'https://api.test.paysafe.com/paymenthub/v1/payments',
                {   
                    "merchantRefNum":req.body.merchantRefNum,
                    "customerId":req.body.custId,
                    "amount":req.body.amount,
                    "currencyCode":"USD",
                    "paymentHandleToken":req.body.paymentHandleToken,
                    "description":"ROIIIM Akhil Assignment"
                },
                {   
                headers: headers
                }          
    ).then(res => {
            response.status(200).json({
                    message:'successful'
                })
    }).catch(err => {
            response.status(500).json({
                    message:'failed'
                })
    })
    
}