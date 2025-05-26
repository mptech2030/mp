const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;

app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "mytoken"; // تأكد تحط نفس التوكين اللي في واتساب

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
