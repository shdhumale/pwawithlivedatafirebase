
const express = require('express');
//import web-push
const webpush = require("web-push");
//import body-parser
const bodyParser = require("body-parser");
//import path
const path = require("path");
const app = express();

// This serves static files from the specified directory
app.use(express.static(path.join(__dirname + '/build')));
app.use(bodyParser.json());

//You can create below given client public and privet key using following command
// .\node_modules\.bin\web-push generate-vapid-keys
const publicVapidKey = "Your public key";
const privateVapidKey = "Your private key";


//Setting the details that will be required by the webpush api. You can get this code from https://github.com/web-push-libs/web-push
webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route :- This will be used to send the subscribe request from the client to service worker
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;
  console.log("subscription:::", subscription);

  // Send 201 - resource created :- Then we send back the status 201 that indicate the resource is created successfully in the nodejs server for the subscription request made by the client.
  res.status(201).json({});

  // Create payload:- that we used to send it to the client that will be shown to the end user.
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification :- In this step we will send this subscription and payload to the client using web.pushSendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});


const server = app.listen(8081, () => {

  const host = server.address().address;
  const port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
