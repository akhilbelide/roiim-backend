const request=require('request')

exports.postPayment=(req,res,next)=>{
    var options = {
        'method': 'POST',
        'url': 'https://private-anon-8467725ed3-paysafeapipaymenthubv1.apiary-proxy.com/paymenthub/v1/payments',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': 'Basic cHJpdmF0ZS03NzUxOkItcWEyLTAtNWYwMzFjZGQtMC0zMDJkMDIxNDQ5NmJlODQ3MzJhMDFmNjkwMjY4ZDNiOGViNzJlNWI4Y2NmOTRlMjIwMjE1MDA4NTkxMzExN2YyZTFhODUzMTUwNWVlOGNjZmM4ZTk4ZGYzY2YxNzQ4'
        },
        body: JSON.stringify({"merchantRefNum":"akhil001","merchantCustomerId":req.body.custId,"amount":10000,"currencyCode":"USD","paymentHandleToken":req.body.paymentHandleToken,"description":"ROIIIM Akhil Assignment"})
      
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
      });
}