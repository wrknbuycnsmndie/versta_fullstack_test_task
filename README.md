# Versta Fullstack Test Task

Тестовое приложение для оформления и просмотра заказов на доставку.

Требования задания:
[versta.io/hr/testfordevjun](https://versta.io/hr/testfordevjun)

Реализованы сценарии из задания:
- создание нового заказа
- просмотр списка заказов
- просмотр конкретного заказа по `id`

## Быстрый запуск через Docker

Основной способ запуска проекта:

```bash
docker compose up --build
```

После старта:
- frontend: `http://localhost:3000`
- backend API: `http://localhost:8080/api/orders`

Как это устроено:
- frontend и backend поднимаются вместе через `docker-compose`
- frontend отдаётся через `nginx`
- запросы на `/api` проксируются на backend внутри общей docker-сети
- это убирает CORS-проблемы в браузере

SQLite база backend хранится в docker volume `backend-data`.

## Стек

### Backend

- ASP.NET Core Minimal API
- Entity Framework Core
- SQLite
- xUnit

### Frontend

- React
- TypeScript
- Vite
- React Router
- React Query
- React Hook Form
- Zod
- Tailwind CSS
- shadcn/ui components

### Infrastructure

- Docker
- Docker Compose
- Nginx

## Структура проекта

- `apps/backend` — backend-приложение и тесты
- `apps/frontend` — frontend-приложение
- `docker-compose.yml` — запуск проекта одной командой

## Что внутри

### Backend

Backend находится в `apps/backend/src/Versta.Orders.Api`.

Эндпоинты:
- `POST /api/orders`
- `GET /api/orders?page=1&pageSize=5`
- `GET /api/orders/{id}`

Что делает backend:
- валидирует входные данные заказа
- сохраняет заказы в SQLite
- генерирует номер заказа
- возвращает список заказов с серверной пагинацией

### Frontend

Frontend находится в `apps/frontend`.

Основные страницы:
- `/` — лендинг
- `/orders` — создание заказа и список заказов
- `/orders/:id` — просмотр конкретного заказа

Что делает frontend:
- валидирует форму на клиенте через `zod`
- отправляет запросы через `react-query`
- показывает loading/error/empty states
- работает с backend через `/api`
