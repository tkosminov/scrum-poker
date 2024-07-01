# Scrum-Poker Back

* NestJS 10
* TypeORM 0.3

## Dependencies

* NodeJS 20
  * [ubuntu/debian](https://computingforgeeks.com/how-to-install-node-js-on-ubuntu-debian/)
* Redis
  * [ubuntu/debian](https://computingforgeeks.com/how-to-install-redis-on-ubuntu/)
* PostgreSQL 13
  * [ubuntu/debian](https://computingforgeeks.com/how-to-install-postgresql-13-on-ubuntu/)

## Installation

```bash
npm ci
```

## Running the app

```bash
npm run start:dev
```

api listening on `http://localhost:8080`

## Docker

```bash
sudo docker network create scrum-poker-network
```

```bash
sudo docker-compose up --build
```

api listening on `http://localhost:8080`
