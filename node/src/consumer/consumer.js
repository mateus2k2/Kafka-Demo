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

var consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': KAFKA_BROKER,
}, {});

consumer.connect();

consumer.on('event.error', function(err) {
  console.error('Consumer error:', err);
});

consumer.on('ready', () => {
  console.log('consumer ready..')
  consumer.subscribe([TOPIC_NAME]);
  consumer.consume();
}).on('data', function(data) {
  console.log(`received message: ${data.value}`);
});
