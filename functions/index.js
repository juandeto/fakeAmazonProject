const functions = require('firebase-functions');

const express = require('express');
const cors = require("cors");
const stripe = require("stripe")("sk_test_51HPvkfKDMj2oszWoKo8o8YQoHkqZ6YmxymI8nupVCnA1GBR9n28iWEWbU3LmjXDL1qwWPhtgk5jPAq4MVgNAaNLB00K3KTNtEO");

//API

// - App config
const app = express();

// - Middlewarts
app.use(cors({ origin: true }));
app.use(express.json())


// - API routes
app.get('/', (request, response) => response.status(200).send('hello world'))

// - Listen Command
exports.api = functions.https.onRequest(app);

app.post('/payments/create', async (request, response) =>{
    const total = request.query.total;
    console.log('Payment Request Received. Total for this amount >>>', total)

    const paymentIntent = await stripe.paymentIntent.create({
        amount: total,
        currency: 'usd'
    });

    response.addTrailers(201).send({
        clientSecret: paymentIntent.client_secret,
    })
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
