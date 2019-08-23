# test node redis cache

## Запустить

```bash
npm i
docker run --rm --name some-redis -d -p 6379:6379 redis
npm start
```

## Проверить

`localhost:5000/repos/itslooklike`

```bash
docker exec -ti some-redis bash

redis-cli
KEYS *
FLUSHALL
```

## Остановить

```bash
docker stop some-redis
```
