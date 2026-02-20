# 🚀 Backend Deployment Guide

> **Stack:** Laravel 11 · PHP-FPM · Nginx · MySQL 8 · Redis · Reverb WebSockets
> **Domain:** `api.m1n.me` · **Server:** Docker

---

## 📋 Prerequisites

- Docker & Docker Compose installed on the server
- SSL certificate already issued at `/etc/letsencrypt/live/api.m1n.me/`  
  _(via Certbot — must exist before starting Nginx)_
- Git access to clone the repository

---

## 1️⃣ Clone the Repository

```bash
git clone <your-repo-url> /opt/app/backend
cd /opt/app/backend
```

---

## 2️⃣ Configure Environment

Copy the production template and fill in your values:

```bash
cp .env.production .env
nano .env
```

**Required values to set:**

| Key                 | Description                                                         |
| ------------------- | ------------------------------------------------------------------- |
| `APP_KEY`           | Generate with `php artisan key:generate --show` locally, paste here |
| `DB_HOST`           | Set to `db` (the docker service name)                               |
| `DB_DATABASE`       | Your database name                                                  |
| `DB_USERNAME`       | Your database user                                                  |
| `DB_PASSWORD`       | A strong password                                                   |
| `REDIS_HOST`        | Set to `redis` (the docker service name)                            |
| `REVERB_APP_ID`     | Any unique string                                                   |
| `REVERB_APP_KEY`    | Any unique string                                                   |
| `REVERB_APP_SECRET` | Any strong secret string                                            |
| `MAIL_*`            | Your SMTP mail provider credentials                                 |

> **Important:** `DB_HOST=db` and `REDIS_HOST=redis` — these must match the service names in `docker-compose.yml`.

---

## 3️⃣ Build & Start the Containers

```bash
docker compose up --build -d
```

This will start 4 containers:

| Container       | Role                                                          |
| --------------- | ------------------------------------------------------------- |
| `laravel_app`   | PHP-FPM + Reverb + Queue Worker + Scheduler (via Supervisord) |
| `laravel_nginx` | Nginx — serves HTTPS on 443, proxies WebSockets               |
| `laravel_db`    | MySQL 8 database                                              |
| `laravel_redis` | Redis for cache, sessions & queues                            |

The `laravel_app` container automatically runs on startup:

- ✅ Waits for MySQL & Redis to be ready
- ✅ Runs `php artisan migrate --force`
- ✅ Creates storage symlink
- ✅ Caches config / routes / views / events
- ✅ Starts **Supervisord** which manages all processes

---

## 4️⃣ Verify Everything is Running

```bash
# Check all containers are up
docker compose ps

# Watch startup logs (migrations, cache, supervisord)
docker compose logs -f app

# Check Nginx
docker compose logs -f nginx
```

---

## 5️⃣ Post-Deployment Commands (via docker exec)

Run all Laravel commands inside the app container:

```bash
# General artisan commands
docker exec -it laravel_app php artisan <command>

# --- Common commands ---

# Re-run migrations
docker exec -it laravel_app php artisan migrate --force

# Refresh all caches
docker exec -it laravel_app php artisan optimize

# Clear all caches
docker exec -it laravel_app php artisan optimize:clear

# Create storage symlink (if missing)
docker exec -it laravel_app php artisan storage:link --force

# Seed the database
docker exec -it laravel_app php artisan db:seed --force

# Open a bash shell inside the container
docker exec -it laravel_app bash
```

---

## 6️⃣ Laravel Reverb (WebSockets)

Reverb is **automatically started by Supervisord** inside the `laravel_app` container — you do NOT need to start it manually.

It listens on port `8080` internally, and Nginx proxies WebSocket connections at `/app` and `/ws` endpoints over HTTPS.

**To check if Reverb is running:**

```bash
docker exec -it laravel_app supervisorctl status
```

Expected output:

```
php-fpm          RUNNING   pid ..., uptime ...
queue-worker:00  RUNNING   pid ..., uptime ...
queue-worker:01  RUNNING   pid ..., uptime ...
reverb           RUNNING   pid ..., uptime ...
scheduler        RUNNING   pid ..., uptime ...
```

**To restart Reverb (without restarting the container):**

```bash
docker exec -it laravel_app supervisorctl restart reverb
```

**To view Reverb logs in real time:**

```bash
docker exec -it laravel_app tail -f /var/log/supervisor/reverb.log
```

---

## 7️⃣ Monitoring & Logs

```bash
# All supervisor-managed process logs
docker exec -it laravel_app tail -f /var/log/supervisor/php-fpm.log
docker exec -it laravel_app tail -f /var/log/supervisor/reverb.log
docker exec -it laravel_app tail -f /var/log/supervisor/queue-worker.log
docker exec -it laravel_app tail -f /var/log/supervisor/scheduler.log

# Laravel application log
docker exec -it laravel_app tail -f /var/www/storage/logs/laravel.log

# Nginx access & error logs
docker compose logs -f nginx
```

---

## 8️⃣ Updating the Application

```bash
# Pull latest code
git pull origin main

# Rebuild and restart the app container only
docker compose up --build -d app

# OR: full restart of all containers
docker compose down && docker compose up --build -d
```

---

## 9️⃣ Common Troubleshooting

| Problem                       | Fix                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------- |
| 502 Bad Gateway               | PHP-FPM not ready yet — check `docker compose logs app`                       |
| Migrations fail on first boot | MySQL takes ~30s to initialize — the startup script retries automatically     |
| WebSockets not connecting     | Check Reverb is running: `docker exec -it laravel_app supervisorctl status`   |
| SSL error on Nginx start      | Ensure `/etc/letsencrypt/live/api.m1n.me/` exists on the host                 |
| Permission errors on storage  | Run `docker exec -it laravel_app chown -R www-data:www-data /var/www/storage` |

---

## 🔌 Port Reference

| Port   | Service                                        |
| ------ | ---------------------------------------------- |
| `80`   | Nginx HTTP (redirects to HTTPS)                |
| `443`  | Nginx HTTPS (main API + WebSocket proxy)       |
| `8080` | Reverb WebSocket (internal, proxied via Nginx) |
| `3307` | MySQL (host-mapped, for DB tools)              |
| `6379` | Redis (host-mapped)                            |
