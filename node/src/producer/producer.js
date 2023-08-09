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

const interval = Math.floor(1000 / Number(MESSAGES_PER_SECOND));

const stream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': KAFKA_BROKER
}, {}, {
  topic: TOPIC_NAME
});

stream.on('error', (err) => {
  console.error('Error in our kafka stream');
  console.error(err);
});

function queueRandomMessage() {
  const message = [...Array(Number(MESSAGE_SIZE))].map(() => Math.random().toString(36).charAt(2)).join('');
  const success = stream.write(Buffer.from(message));     
  
  if (success) {
    console.log(`message queued (${message})`);
  } else {
    console.log('Too many messages in the queue already..');
  }
}

setInterval(() => {
  queueRandomMessage();
}, interval);