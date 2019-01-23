const redisConnection = require("./redis-connection");
const uuidv4 = require("uuid/v4");

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

function submitEvent(event, reqId, data, name) {
    if (data == "loading") {
        data = {
            error: 'Still loading data. Please wait and try again'
        }
    }
    redisConnection.emit(event, {
        requestId: reqId,
        data: data,
        eventName: name
    });
}

redisConnection.on("POST:request:*", async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;
    var failedEvent = `${eventName}:failed:${requestId}`;
    let successEvent = `${eventName}:success:${requestId}`;

    var personData = message.data;
    //console.log(personData);
    try {
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, db) {
            if (err) throw err;

            var dbo = db.db("famdb");
            var col = dbo.collection("persons");

            if (!personData._id) {
                var id = uuidv4();
                personData._id = id;
            }

            var pquery = {
                firstName: personData.parents.p.firstName,
                lastName: personData.parents.p.lastName
            };

            var mquery = {
                firstName: personData.parents.m.firstName,
                lastName: personData.parents.m.lastName
            };

            col.findOne(pquery, function (err, res) {
                if (err) throw err;

                personData.pline = res.pline;

                col.findOne(mquery, function (err, mres) {
                    if (err) throw err;

                    personData.mline = mres.mline;

                    if (personData.gender == "Male") {
                        personData.pline.push(personData._id);
                    } else {
                        personData.mline.push(personData._id);
                    }
                    col.insertOne(personData, function (err, res) {
                        if (err) throw err;
                        data = res.result;
                        data.id = personData._id;
                        submitEvent(successEvent, requestId, data, eventName);
                    })
                })
                col.updateOne(mquery, {
                    $addToSet: {
                        children: personData._id
                    }
                })
                col.updateOne(pquery, {
                    $addToSet: {
                        children: personData._id
                    }
                })
            })
        })
    } catch (e) {
        data = {
            error: `Web worker encountered error: ${e}`
        }
        submitEvent(failedEvent, requestId, data, eventName);
    }
});

redisConnection.on("GET:request:*", async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;
    var failedEvent = `${eventName}:failed:${requestId}`;
    let successEvent = `${eventName}:success:${requestId}`;

    var personId = message.data.id;
    //console.log(personId);
    var line = message.data.line;

    try {
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, async function (err, db) {
            var dbo = db.db("famdb");
            var col = dbo.collection("persons");

            var query = {
                _id: personId
            };

            col.findOne(query, function (err, res) {
                if (err) throw err;
                var lquery = {};
                try {
                    if (line == "pline") {
                        lquery.pline = res.pline[0];
                    } else {

                        lquery.mline = res.mline[0];
                    }
                    col.find(lquery).toArray(function (err, res) {
                        if (err) throw err;
                        data = res;
                        submitEvent(successEvent, requestId, res, eventName);
                    })
                } catch (e) {
                    throw e;
                }
            })
        })
    } catch (e) {
        data = {
            error: `Web worker encountered error: ${e}`
        }
        submitEvent(failedEvent, requestId, data, eventName);
    }
});