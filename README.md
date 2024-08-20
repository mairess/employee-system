# Employee System

[![codecov](https://codecov.io/gh/mairess/employee-system/graph/badge.svg?token=uhpCCXvCNz)](https://codecov.io/gh/mairess/employee-system)

## Context

This is a system for managing employees.

## Run locally

To run this project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

⚠️ [Java](https://www.oracle.com/java/)

⚠️ [Docker](https://www.docker.com/get-started/)

### Steps:

1. Clone repository:

```BASH
git clone git@github.com:mairess/employee-system.git

cd employee-system
```

2. Install dependencies:

```BASH
mvn install -DskipTests
```

3. Start database:

```BASH
docker compose up database -d database 
```

4. Run API:

```BASH
mvn spring-boot:run
```

5. Run tests:

```BASH
mvn test
```

6. Documentation and available routes:

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

4. Documentation and available routes:

```BASH
http://localhost:8080/swagger-ui/index.html
```