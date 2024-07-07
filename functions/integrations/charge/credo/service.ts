// let Credo = require('credo-node');

// // You should store your API key as an environment variable
// let secretKey = process.env.CREDO_SECRET_KEY

// // When your environment is "development" or "local", the SDK will use the sandbox API
// let environment = process.env.NODE_ENV
// let credo = new Credo(secretKey, environment);

// credo.initiatePayments({
//     amount: 100,
//     currency: "NGN",
//     redirectUrl: "https://billonapp.azurewebsites.net/callback",
//     transRef: "hytry5",
//     paymentOptions: "CARD,BANK,USSD",
//     customerEmail: "customer@something.com",
//     customerName: "John Doe",
//     customerPhoneNo: "+234 813 000 000"
//   }).then((response) => {
//     console.log(response.body)
//   })