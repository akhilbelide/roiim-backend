const request=require('request')

exports.getTest=(req,res,next) => {
    res.send('Hi! From Heroku')
}

exports.postPayment=(req,res,next)=>{
    console.log(req.body)
    var options = {
        'method': 'POST',
        'url': 'https://api.test.paysafe.com/paymenthub/v1/payments',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4'
        },
        body: JSON.stringify({"merchantRefNum":req.body.merchantRefNum,"customerId":req.body.custId,"amount":10000,"currencyCode":"USD","paymentHandleToken":req.body.paymentHandleToken,"description":"ROIIIM Akhil Assignment"})
      
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
      });

      res.status(200).json({
          message:'successful'
      })
}