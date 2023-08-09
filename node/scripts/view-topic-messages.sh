docker exec -it kafka-1 /bin/kafka-topics \
  --bootstrap-server localhost:9092 \
  --from-beginning \
  --topic test
