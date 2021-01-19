const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')

const app=express()
const payapiRoutes=require('./routes/payapi')
const createcustController=require('./createcust')
app.use(bodyparser.json())

//app.use(cors())

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/create-customer', createcustController.postCreateCust)

app.use('/payment', payapiRoutes)

app.listen(process.env.PORT || 8081);



