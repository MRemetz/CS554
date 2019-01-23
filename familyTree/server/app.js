const http = require("http");
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const path = require('path');
const app = express();
const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");


app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../react-client/dist`));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../react-client/dist/index.html`));
});

app.get("/api/pline/:id", async (req, res) => {
  try {
      let response = await nrpSender.sendMessage({
          redis: redisConnection,
          eventName: "GET",
          data: {
              id: req.params.id,
              line: "pline"
          }
      });

      res.json(response);

  } catch (e) {
      res.json({
          error: e.error
      });
  }
});

app.get("/api/mline/:id", async (req, res) => {
  try {
      let response = await nrpSender.sendMessage({
          redis: redisConnection,
          eventName: "GET",
          data: {
              id: Number(req.params.id),
              line: "mline"
          }
      });

      res.json(response);

  } catch (e) {
      res.json({
          error: e.error
      });
  }
});

app.post("/api/person", async (req, res) => {
  try {
      const personData = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          parents:{
              p: {
                  firstName: req.body.pf,
                  lastName: req.body.pl
              },
              m: {
                  firstName: req.body.mf,
                  lastName: req.body.ml
              }
          },
          age: req.body.age,
          gender: req.body.gender

      }
      
      let response = await nrpSender.sendMessage({
          redis: redisConnection,
          eventName: "POST",
          data: personData
      });

      res.json(response);

  } catch (e) {
      res.json({
          error: e.error
      });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});


