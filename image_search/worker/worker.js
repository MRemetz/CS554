const redisConnection = require("./redis-connection");
//const axios = require('axios');

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

