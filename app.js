const express=require('express')

const app=expresss()
const payapiRoutes=require('./routes/payapi')

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
app.use('/payment', payapiRoutes)

app.listen(process.env.PORT || 8080);



