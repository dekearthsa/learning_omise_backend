
const PUBLIC_KEY_DEMO = "";
const SECRET_KEY_DEMO = "";

const CURRENCY_TYPE = "thb";

var omise = require('omise')({
    'publicKey': PUBLIC_KEY_DEMO,
    'secretKey': SECRET_KEY_DEMO
});

const controllerPaymentGateway = async (req:any, res:any, next:any) => {
    const { email, name, amount, token} = req.body;
    console.log(email, name, amount, token)
    // const payload: structPayloadPurchase  = req.body;
    try{
        const customer = await omise.customers.create({
            email,
            description: name,
            card: token
        });

        const charge = await omise.charges.create({
            amount: amount,
            currency: CURRENCY_TYPE,
            customer: customer.id
        })

        res.send({
            amount: charge.amount,
            status: charge.status,
            description: "Purchase success!",
            error: false
        });

    }catch(err){
        console.log(err);
        res.send({
            amount: 0,
            status: err,
            description: err,
            error: true
        })
    }
    next();
}

export {controllerPaymentGateway}