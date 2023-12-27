const express = require("express");
const cors = require("cors");

const {controllerDebug} = require("../controller/controllerDebug");
const {controllerPaymentGateway} = require("../controller/controllerPaymentGateway");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
    {origin: '*'}
));


app.get("/api/debug",controllerDebug);
app.post("/api/demo/purchase", controllerPaymentGateway);

export {app}