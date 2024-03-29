const uuid = require("node-uuid");
const NRP = require("node-redis-pubsub");

const nrpConfig = {
  port: 6379,
  scope: "queue"
};

const defaultRedisConnection = new NRP(nrpConfig);

const defaultMessageConfig = {
  data: {},
  eventName: "send",
  redis: defaultRedisConnection,
  expectsResponse: true
};

const sendMessage = (messageConfig = defaultMessageConfig) => {
  return new Promise((fulfill, reject) => {
    let settings = Object.assign({}, defaultMessageConfig, messageConfig);

    let messageId = uuid.v4();
    let redisConnection = settings.redis;
    let eventName = settings.eventName;
    let outgoingEventName = `${eventName}:request:${messageId}`;

    if (settings.expectsResponse) {
      let successEventName = `${eventName}:success:${messageId}`;
      let failedEventName = `${eventName}:failed:${messageId}`;

      let success = redisConnection.on(
        successEventName,
        (response, channel) => {
          fulfill(response.data);
          endMessageLifeCycle();
        }
      );

      let error = redisConnection.on(failedEventName, (response, channel) => {
        reject(response.data);
        endMessageLifeCycle();
      });

      let shutoffEvents = [success, error];

      let endMessageLifeCycle = () => {
        shutoffEvents.forEach(shutOff => {
          shutOff();
        });
      };
    }

    redisConnection.emit(outgoingEventName, {
      requestId: messageId,
      data: settings.data,
      eventName: settings.eventName
    });

    if (!settings.expectsResponse) {
      fulfill();
    }
  });
};

module.exports = {
  sendMessage
};