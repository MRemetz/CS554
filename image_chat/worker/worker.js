const redisConnection = require("./redis-connection");
const axios = require('axios');

const pixKey = "10836477-0e09ac732aa67335a41e51c42"

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

    try {
        submitEvent(successEvent, requestId, dummyData[i], eventName);

    } catch (e) {
        data = {
            error: `Web worker encountered error: ${e}`
        }
        submitEvent(failedEvent, requestId, data, eventName);
    }
});