import os
import time
import pika
# from dotenv import load_dotenv

import secrets
import string

# load_dotenv()

host = "172.17.0.2"
port = "5672"
username = "guest"
password = "guest"
queue_name = "myqueue"
message_size = 32
messages_per_second = 10


# host = os.getenv('HOST')
# port = int(os.getenv('PORT'))
# username = os.getenv('USERNAME')
# password = os.getenv('PASSWORD')
# queue_name = os.getenv('QUEUE_NAME')
# message_size = int(os.getenv('MESSAGE_SIZE'))
# messages_per_second = int(os.getenv('MESSAGES_PER_SECOND'))

connection = pika.BlockingConnection(pika.ConnectionParameters(host=host, port=port, credentials=pika.PlainCredentials(username, password)))
channel = connection.channel()
channel.queue_declare(queue=queue_name)

for i in range(0,messages_per_second*60*60):
    message = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(message_size))
    print(f" {i+1} [x] Sent: {message}")
    channel.basic_publish(exchange='', routing_key=queue_name, body=message)
    time.sleep(1 / messages_per_second)

connection.close()