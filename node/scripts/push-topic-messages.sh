docker exec -it kafka-1 /bin/kafka-topics \
    --broker-list localhost:9092 \
    --topic test
