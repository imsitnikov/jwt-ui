# UI JWT Auth

Демо репозиторий ui сервера взаимодействующего с auth сервисом.

# Старт приложения

1) `npm ci`

2) После установки зависимостей необходимо пропатчить пакет `@gravity-ui/expresskit` в node_modules, содержимое патча лежит в `node_modules_patches/@gravity-ui/expresskit`. Предполагается что необходимые изменения будут внесены в `@gravity-ui/expresskit`.

3) Создать в корне репозитория файл `.env` с содержимым:

```
APP_INSTALLATION=demo
APP_ENV=development
APP_DEV_MODE=true

AUTH_ENDPOINT=http://localhost:3001

ACCESS_TOKEN_PUBLIC_KEY=<ACCESS_TOKEN_PUBLIC_KEY из auth сервиса>
```

4) `npm run dev`