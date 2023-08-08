FROM python:3.9

WORKDIR /app

COPY requirements.txt .
COPY .env .
RUN pip install --no-cache-dir -r requirements.txt

COPY consumer.py .

# CMD [ "python", "consumer.py" ]

# docker build -t mateus2k2/consumer:1.0 .
# docker run -it mateus2k2/consumer:1.0
# docker push mateus2k2/consumer:1.0
# https://hub.docker.com/r/mateus2k2/consumer
# docker login -u "user" -p "senha" docker.io

