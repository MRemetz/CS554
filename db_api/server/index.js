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
                id: req.params.id
            }
        });

        res.json(response);

    } catch (e) {
        res.json({
            error: e.error
        });
    }
});

app.post("/api/people", async (req, res) => {
    try {
        let fields = ["id", "first_name", "last_name", "email", "gender", "ip_address"];
        let missing = [];
        for (var i = 0; i < fields.length; i++) {
            if(!req.body[fields[i]]) missing.push(fields[i]);
        }
        if (missing.length > 0) throw {error: `The following fields are missing from request body: ${missing}`};

        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "POST",
            data: req.body
        });

        res.json(response);

    } catch (e) {
        res.json({
            error: e.error
        });
    }
});

app.delete("/api/people/:id", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "DELETE",
            data: {
                id: req.params.id
            }
        });

        res.json(response);

    } catch (e) {
        res.json({
            error: e.error
        });
    }
});

app.put("/api/people/:id", async (req, res) => {
    try {

        if (req.body.id) throw {error: '\'id\' cannot be changed: Please remove \'id\' from request body'}

        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "PUT",
            data: {
                id: req.params.id,
                fields: req.body
            }
        });

        res.json(response);
    } catch (e) {
        res.json({
            error: e.error
        });
    }
});

app.listen(3000, () => {
    console.log("Loading Data...this takes a few seconds");
});