const redisConnection = require("./redis-connection");

const axios = require('axios');

async function loadData() {
    const dataURL = 'https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json';
    const res = await axios.get(dataURL);
    dummyData = res.data;
    if (dummyData) {
        console.log("Data loaded successfully\n")
        console.log("We've now got a server!");
        console.log("Your routes will be running on http://localhost:3000");
    }
}

var dummyData = null;
loadData();


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

redisConnection.on("GET:request:*", async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;
    var failedEvent = `${eventName}:failed:${requestId}`;
    let successEvent = `${eventName}:success:${requestId}`;

    if (dummyData === null) {
        submitEvent(failedEvent, requestId, "loading", eventName);

    } else {
        try {
            let id = message.data.id;
            for (var i in dummyData) {
                if (dummyData[i] && dummyData[i]["id"] == id) {
                    submitEvent(successEvent, requestId, dummyData[i], eventName);
                    break;
                }
            }
            throw 'User not found'

        } catch (e) {
            data = {
                error: `Web worker encountered error: ${e}`
            }
            submitEvent(failedEvent, requestId, data, eventName);
        }
    }
});

redisConnection.on("POST:request:*", async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;
    var failedEvent = `${eventName}:failed:${requestId}`;
    let successEvent = `${eventName}:success:${requestId}`;

    if (dummyData === null) {
        submitEvent(failedEvent, requestId, "loading", eventName);

    } else {
        try {
            let person = message.data;
            let id = person.id
            for (var i in dummyData) {
                if (dummyData[i] && dummyData[i]["id"] == id) throw `Person with id ${id} already exists. Please try another id`
            }
            dummyData.push(message.data);
            submitEvent(successEvent, requestId, person, eventName);

        } catch (e) {
            data = {
                error: `Web worker encountered error: ${e}`
            }
            submitEvent(failedEvent, requestId, data, eventName);
        }
    }
});

redisConnection.on("DELETE:request:*", async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;
    var failedEvent = `${eventName}:failed:${requestId}`;
    let successEvent = `${eventName}:success:${requestId}`;

    if (dummyData === null) {
        submitEvent(failedEvent, requestId, "loading", eventName);

    } else {
        try {
            let id = message.data.id;
            for (var i in dummyData) {
                if (dummyData[i] && dummyData[i]["id"] == id) {
                    dummyData.splice(i, 1);
                    response = {
                        messsage: `Person with id: ${id} was removed successfully`
                    }
                    submitEvent(successEvent, requestId, response, eventName);
                    break;
                }
            }
            throw 'User not found'

        } catch (e) {
            data = {
                error: `Web worker encountered error: ${e}`
            }
            submitEvent(failedEvent, requestId, data, eventName);
        }
    }
});

redisConnection.on("PUT:request:*", async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;
    var failedEvent = `${eventName}:failed:${requestId}`;
    let successEvent = `${eventName}:success:${requestId}`;

    if (dummyData === null) {
        submitEvent(failedEvent, requestId, "loading", eventName);

    } else {
        try {
            let id = message.data.id;
            let toUpdate = message.data.fields;

            for (var i in dummyData) {
                if (dummyData[i] && dummyData[i]["id"] == id) {
                    let person = dummyData[i];
                    for (field in toUpdate) {
                        person[field] = toUpdate[field];
                    }
                    submitEvent(successEvent, requestId, dummyData[i], eventName);
                    break;
                }
            }
            throw "User not found";

        } catch (e) {
            data = {
                error: `Web worker encountered error: ${e}`
            }
            submitEvent(failedEvent, requestId, data, eventName);
        }

    }
});