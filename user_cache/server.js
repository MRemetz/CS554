const bluebird = require("bluebird")
const express = require("express")
const redis = require("redis")
const data = require("./data")

const app = express();
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


app.get("/api/people/history", async (req, res) => {
    await client
        .lrange("recentList", 0, 19, function(err, reply) {
            var list = [];
            for (var i in reply){
                var user = JSON.parse(reply[i]);
                list.push(user);
            }
            res.send(list);
        });
});

app.get("/api/people/:id", async (req, res, next) => {
    let userInCache = await client.getAsync(req.params.id);
    if (userInCache) {
        res.send(userInCache);
        client.lpush(
            "recentList",
            userInCache
        );
    } else {
        next();
    }
});

app.get("/api/people/:id", async (req, res) => {
    data
        .getById(req.params.id)
        .then(user =>{
            res.send(user);
            client.setAsync(
                req.params.id,
                JSON.stringify(user)
            );
            client.lpush(
                "recentList",
                JSON.stringify(user)
            );
        })
        .catch(() =>{
            res.status(404).json({ error: "User not Found" });
        });
});

app.listen(3000, () => {
    console.log("Server up and running!");
    console.log("Your routes will be running on http://localhost:300");
});
