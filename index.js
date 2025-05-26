const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Webhook verification (this is needed to validate the webhook)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const VERIFY_TOKEN = 'mytoken'; // استبدلها بتوكينك الخاص

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verified');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403); // Forbidden if token doesn't match
    }
  } else {
    res.sendStatus(400); // Bad request if parameters are missing
  }
});

// Webhook POST endpoint to handle incoming messages
app.post('/webhook', (req, res) => {
  console.log('Received Webhook:', req.body); // Log incoming data from Webhook

  // Here you can handle the data (like sending a message or storing it)
  // For now, just send a success response
  res.sendStatus(200); 
});
js
const port = process.env.port ||3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

