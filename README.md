# Employee System

coverage backend

[![codecov](https://codecov.io/gh/mairess/employee-system/graph/badge.svg?token=uhpCCXvCNz)](https://codecov.io/gh/mairess/employee-system)

## Context

This is a system for managing employees.

Frontend is in MVP mode and only supports password change.

## Run with Docker

### Prerequisites

⚠️ Make sure you have [Docker](https://www.docker.com/get-started/) installed on your machine:


Also set up the following env variables for the mail service ([guide here](./docs/set-env-variables-mail-service.md)):

```
MAIL_HOST=smtp.example.com 

MAIL_PORT=123

MAIL_USERNAME=mymail@example.com

MAIL_PASSWORD=asdfASDF123

```

⚠️ The variable `MAIL_PASSWORD` is not your email password, you need to create an app password, set this up [here](https://myaccount.google.com/apppasswords) if using google.

### Steps:

1. Clone repository:

```BASH
git clone git@github.com:mairess/employee-system.git

cd employee-system
```

2. Run application:

```BASH
docker compose up -d --build 
```

3. Available routes:

```BASH
http://localhost:8080/swagger-ui/index.html
```

## Run locally

To run this project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

⚠️ [Java](https://www.oracle.com/java/)

⚠️ [Docker](https://www.docker.com/get-started/)

⚠️ [Apache kafka](https://kafka.apache.org/quickstart)

Also set up the following env variables for the mail service ([guide here](./docs/set-env-variables-mail-service.md)):

```
MAIL_HOST=smtp.example.com 

MAIL_PORT=123

MAIL_USERNAME=mymail@example.com

MAIL_PASSWORD=asdfASDF123

```

⚠️ The variable `MAIL_PASSWORD` is not your email password, you need to create an app password, set this up [here](https://myaccount.google.com/apppasswords) if using google.

### Steps:

1. Start Kafka with KRaft (Kafka must be running before start the application):

```BASH
# Generate a Cluster UUID
KAFKA_CLUSTER_ID="$(bin/kafka-storage.sh random-uuid)"

# Format Log Directories
bin/kafka-storage.sh format -t $KAFKA_CLUSTER_ID -c config/kraft/server.properties

#Start the Kafka Server
bin/kafka-server-start.sh config/kraft/server.properties
```

2. Clone repository:

```BASH
git clone git@github.com:mairess/employee-system.git

cd employee-system
```

3. Start database:

```BASH
docker compose up -d database
```

4. Start backend:

```BASH
cd backend

mvn clean install

mvn spring-boot:run
```

5. Start ms-reset-password:

```BASH
# open another terminal and enter ms-reset-password

cd ms-reset-password

mvn clean install

mvn spring-boot:run
```

6. Start frontend (just to change password nothing more):

```BASH
# open another terminal and enter frontend

cd frontend

npm install

npm run dev
```

7. Available routes:

```BASH
http://localhost:8080/swagger-ui/index.html
```