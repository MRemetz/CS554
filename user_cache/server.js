const bluebird = require("bluebird")
const express = require("express")
const redis = require("redis")
const data = require("./data")

const app = express();
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


app.get("/api/people/history", async (req, res) => {
});

app.get("/api/people/:id", async (req, res, next) => {
    let userInCache = await client.getAsync(req.params.id);
    if (userInCache) {
        console.log("found in cache");
        res.send(userInCache);
    } else {
        next();
    }
});

app.get("/api/people/:id", async (req, res) => {
    let user = await data.getById(req.params.id);
    console.log(user)

    res.json(user);

    let cachedUser = await client.setAsync(
        req.params.id,
        JSON.stringify(user)
    );
});

app.listen(3000, () => {
    console.log("Server up and running!");
    console.log("Your routes will be running on http://localhost:300");
});
