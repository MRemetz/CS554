const bluebird = require("bluebird")
const express = require("express")
const redis = require("redis")

const app = express();
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

app.get("/api/people/history", async (req, res) => {
});

app.get("/api/people/:id", async (req, res) => {
});

app.listen(3000, () => {
    console.log("Server up and running!");
    console.log("Your routes will be running on http://localhost:300");
});
