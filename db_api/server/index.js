const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");

app.use(bodyParser.json());

app.get("/api/people/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
          redis: redisConnection,
          eventName: "GET",
          data: {
            message: req.body.message
          }
        });
    
        res.json(response);
      } catch (e) {
        res.json({ error: e.message });
      }
});

app.post("/api/people", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
          redis: redisConnection,
          eventName: "POST",
          data: {
            message: req.body.message
          }
        });
    
        res.json(response);
      } catch (e) {
        res.json({ error: e.message });
      }
});

app.delete("/api/people/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
          redis: redisConnection,
          eventName: "DELETE",
          data: {
            message: req.body.message
          }
        });
    
        res.json({message: "person with id: " + id + " successfully deleted"});
      } catch (e) {
        res.json({ error: e.message });
      }
});

app.put("/api/people/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
          redis: redisConnection,
          eventName: "PUT",
          data: {
            message: req.body.message
          }
        });
    
        res.json(response);
      } catch (e) {
        res.json({ error: e.message });
      }
});

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
  });
  