docker exec -it kafka-1 /bin/kafka-topics \
    --create \
    --bootstrap-server localhost:9092 \
    --replication-factor 1 \
    --partitions 1 \
    --topic test