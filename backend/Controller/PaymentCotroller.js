var stripe = require('stripe')('sk_test_51K4qSDSDKSKZkZmcZRrjoIJ6u22ecbGrQlm69DAEugIWQdfMKBT2KRxA2ueDyQal6CpARnRAcOWgaKcpleh3qmfe00sqw00Yts');

exports.PaymentConfirm = (req,res) =>{
    console.log(req.body);
   
    stripe.charges.create({
        amount:50,
        currency:'INR',
        description:"One Time Payment",
        source : req.body.result.token.id,
    },
    (err)=>{
        if(err){
            console.log(err);
        }
        res.status(200).send("Payment Sucessfull")
    })
}