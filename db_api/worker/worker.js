const redisConnection = require("./redis-connection");

const axios = require('axios');

async function loadData() {
    const dataURL = 'https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json';
    const res = await axios.get(dataURL);
    dummyData = res.data;
}

var dummyData = null;
loadData();

redisConnection.on("GET:request:*", async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;
    var failedEvent = `${eventName}:failed:${requestId}`;
    let successEvent = `${eventName}:success:${requestId}`;

    if (dummyData === null) {
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: {
                error: 'Still loading data. Please wait and try again'
            },
            eventName: eventName
        });

    } else {
        let id = message.data.id;
        for (var i in dummyData) {
            if (dummyData[i] && dummyData[i]["id"] == id) {
                redisConnection.emit(successEvent, {
                    requestId: requestId,
                    data: dummyData[i],
                    eventName: eventName
                });
                break;
            }
        }
        redisConnection.emit(failedEvent, {
            requestId: requestId,
            data: {
                error: 'User not found'
            },
            eventName: eventName
        });
    }
});