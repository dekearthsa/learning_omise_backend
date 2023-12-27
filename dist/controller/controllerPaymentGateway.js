"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerPaymentGateway = void 0;
const PUBLIC_KEY_DEMO = "pkey_test_5x6z2poriuh0aisxnp2";
const SECRET_KEY_DEMO = "skey_test_5x6z2pqc6cf5bxlvgpl";
const CURRENCY_TYPE = "thb";
var omise = require('omise')({
    'publicKey': PUBLIC_KEY_DEMO,
    'secretKey': SECRET_KEY_DEMO
});
const controllerPaymentGateway = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, amount, token } = req.body;
    console.log(email, name, amount, token);
    // const payload: structPayloadPurchase  = req.body;
    try {
        const customer = yield omise.customers.create({
            email,
            description: name,
            card: token
        });
        const charge = yield omise.charges.create({
            amount: amount,
            currency: CURRENCY_TYPE,
            customer: customer.id
        });
        res.send({
            amount: charge.amount,
            status: charge.status,
            description: "Purchase success!",
            error: false
        });
    }
    catch (err) {
        console.log(err);
        res.send({
            amount: 0,
            status: err,
            description: err,
            error: true
        });
    }
    next();
});
exports.controllerPaymentGateway = controllerPaymentGateway;
