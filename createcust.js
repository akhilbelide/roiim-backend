const express=require('express')
const axios=require('axios')
const config=require('./config')


exports.postCreateCust=(req,response,next) => {
    const refnum=req.body.data.merchantRefNum
    console.log('RefNum line 8 ',refnum)

    axios.get('https://api.test.paysafe.com/paymenthub/v1/customers?merchantCustomerId='+ refnum, {
        headers: {
            'Authorization':'Basic ' + config.key,
            'Content-Type':'application/json'
        }
    })
    .then(res=>{
        console.log('Result after fiding custid line 17 ',res.status)
        console.log(typeof(res.status))
        if(res.status=='200'){
        
            const custId=res.data.id
            console.log('line 20 ',res.data)
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
              }).then(resp=>{
                  console.log('after getting token line 32',resp.data)
                  if(resp.status=='201'){
                    response.status(200).json({
                        message:'successful',
                        token:resp.data.singleUseCustomerToken,
                        id:resp.data.customerId
                    })
                  }
              }).catch(err => console.log(err))
        }
        else if(res.status==404){
            console.log("hey......")
        }
        else{
            console.log('not found line 43')
            axios.post('https://api.test.paysafe.com/paymenthub/v1/customers',
                {
                    "merchantCustomerId": refnum,
                    "locale": "en_US",
                    "firstName": "John",
                    "middleName": "James",
                    "lastName": "Smith",
                    "dateOfBirth": {
                      "year": 1981,
                      "month": 10,
                      "day": 24
                    },
                    "email": "john.smith@email.com",
                    "phone": "777-444-8888",
                    "ip": "192.0.126.111",
                    "gender": "M",
                    "nationality": "Canadian",
                    "cellPhone": "777-555-8888"
                }
                ,{
                headers: {
                    'Authorization':'Basic ' + config.key,
                    'Content-Type':'application/json'
                }}).then(res => {
                    console.log('after creating custid line 68 ',res)
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
                                console.log('line 81',res)
                                if(res.statusCode==200){
                                    res.status(200).json({
                                        message:'successful',
                                        token:res.data.singleUseCustomerToken,
                                        id:res.data.id
                                        })
                                }
                            }).catch(err => console.log(err))
                })
            }
    })
    .catch(err => {
        console.log('line 98 ', err)
        res.status(500).json({
            message:'failure',
            })
    })
}