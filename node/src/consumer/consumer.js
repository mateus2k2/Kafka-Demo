import Kafka from 'node-rdkafka';
import dotenv from 'dotenv';

dotenv.config();

const {
  KAFKA_BROKER = 'localhost:29092',
  TOPIC_NAME = 'test',
  MESSAGE_SIZE = 16,
  MESSAGES_PER_SECOND = 1,
} = process.env;

console.log('KAFKA_BROKER', KAFKA_BROKER);
console.log('TOPIC_NAME', TOPIC_NAME);
console.log('MESSAGE_SIZE', MESSAGE_SIZE);
console.log('MESSAGES_PER_SECOND', MESSAGES_PER_SECOND);

let messageCount = 0;
let messagesReceived = 0;

const printMessagesPerSecond = () => {
  console.log(`Received ${messagesReceived} messages in the last second.`);
  messagesReceived = 0;
};


const setupAndConnectConsumer = () => {
  const consumer = new Kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': KAFKA_BROKER,
  }, {});

  consumer.on('event.error', function (err) {
    // console.error('Consumer error:', err);
    console.error('Consumer error:');
  });

  consumer.on('ready', () => {
    console.log('consumer ready..')

    setInterval(printMessagesPerSecond, 1000);

    consumer.subscribe([TOPIC_NAME]);
    consumer.consume();
  }).on('data', function (data) {
    messageCount++;
    messagesReceived++;
    console.log(`Received message: ${data.value}`);
  });

  consumer.connect();
};

setupAndConnectConsumer();


