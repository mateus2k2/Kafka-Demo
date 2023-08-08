import os
import pika
# from dotenv import load_dotenv
import time

# load_dotenv()

# host = os.getenv('HOST')
# port = int(os.getenv('PORT'))
# username = os.getenv('USERNAME')
# password = os.getenv('PASSWORD')
# queue_name = os.getenv('QUEUE_NAME')

host = "172.17.0.2"
port = "15672"
username = "guest"
password = "guest"
queue_name = "myqueue"

countMessages = 0
startTime = time.time()

def callback(ch, method, properties, body):
    
    global countMessages
    global startTime
    
    timer = 0
    countMessages += 1
    timePassed = time.time() - startTime 
    
    if(timePassed > 1):
        timer = countMessages / timePassed
        countMessages = 0
        startTime = time.time()
    else:
        timer = countMessages / timePassed
        
    print(f" [x] Received: {body.decode()} - Message Rate: {timer:.2f} messages/sec")

connection = pika.BlockingConnection(pika.ConnectionParameters(host=host, port=port, credentials=pika.PlainCredentials(username, password)))
channel = connection.channel()
channel.queue_declare(queue=queue_name)
channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

print(' [*] Waiting for messages. To exit, press CTRL+C')
channel.start_consuming()
