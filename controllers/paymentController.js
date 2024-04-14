import Response from "../helpers/response.js";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();

// payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});


export const getPaymentController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function(err, response){
        if(err) Response(res, 500, "Failed to get token", null, err?.message || err );
        else {
          Response(res, 200, "Succeeded to get token", response, null );
        }
      });
    } catch (error) {
      return Response(res, 500, "Failed to get token", null, error?.message || error );
    }
  };
  
  export const makePaymentController = async (req, res) => {
    try {
      const { email, nonce } = req.body;
  
      let newTransaction = gateway.transaction.sale({
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true
        }
      },
      function(err, res){
        if(res) {
          const order = new orderModel({
            payment: res,
            email: email,
          }).save()
          res.json({ok:true});
        } else {
          Response(res, 500, "Payment failed!", null, err?.message || err);
        }
      }
      );
      return Response(res, 200, "Payment Successfully!");
    } catch (error) {
      return Response(res, 500, "Payment Failed", null, error?.message || error );
    }
  };