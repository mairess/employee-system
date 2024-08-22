# Employee System

coverage backend

[![codecov](https://codecov.io/gh/mairess/employee-system/graph/badge.svg?token=uhpCCXvCNz)](https://codecov.io/gh/mairess/employee-system)

## Context

This is a system for managing employees.

Frontend is in MVP mode and only supports password change.

## Run locally

To run this project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

⚠️ [Java](https://www.oracle.com/java/)

⚠️ [Docker](https://www.docker.com/get-started/)

⚠️ [Apache kafka](https://kafka.apache.org/documentation/#quickstart)

Also, set up the following env variables for the mail service:

```
MAIL_HOST=smtp.gmail.com 

MAIL_PORT=123

MAIL_USERNAME=mymail@example.com

MAIL_PASSWORD=asdfASDF123

```

⚠️ The variable `MAIL_PASSWORD` is not your email password, you need to create an app password, set this up [here](https://myaccount.google.com/apppasswords) if using google.

### Steps:

1. Clone repository:

```BASH
git clone git@github.com:mairess/employee-system.git

cd employee-system/backend
```

2. Install dependencies:

```BASH
mvn clean install
```

3. Start ZooKeeper:

```BASH
bin/zookeeper-server-start.sh config/zookeeper.properties
```

4. Start Kafka:

```BASH
bin/kafka-server-start.sh config/server.properties
```

4. Start database:

```BASH
docker compose up database -d database 
```

5. Start backend:

```BASH
mvn spring-boot:run
```

6. Run tests:

```BASH
mvn test
```

7. Available routes:

```BASH
http://localhost:8080/swagger-ui/index.html
```

## Run with Docker

### Prerequisites

Make sure you have the following installed on your machine:

⚠️ [Docker](https://www.docker.com/get-started/)

### Steps:

1. Clone repository:

```BASH
git clone git@github.com:mairess/employee-system.git

cd employee-system
```

2. Run API:

```BASH
docker compose up -d --build 
```

3. Run tests:

```BASH
mvn test
```

4. Available routes:

```BASH
http://localhost:8080/swagger-ui/index.html
```