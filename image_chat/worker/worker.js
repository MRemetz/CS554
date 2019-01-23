const redisConnection = require("./redis-connection");
const axios = require('axios');

const pixKey = '10836477-0e09ac732aa67335a41e51c42';
const pixUrl ='https://pixabay.com/api/';

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
        reqUrl = `${pixUrl}?key=${pixKey}&q=${encodeURIComponent(message.data.query)}`;
        const res = await axios.get(reqUrl);
        var images = [];
        for (var i = 0; i < 3; i++){
            if (res.data.hits[i]){
                images.push(res.data.hits[i].largeImageURL);
            }
        }
        const result = {
            username: message.data.username,
            message: message.data.message,
            images: images
        }
        submitEvent(successEvent, requestId, result, eventName);

    } catch (e) {
        data = {
            error: `Web worker encountered error: ${e.response.data}`
        }
        submitEvent(failedEvent, requestId, data, eventName);
    }
});