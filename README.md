# Course Project

## Structure

| Codebase              |      Description          |
| :-------------------- | :-----------------------: |
| [client](client)      |      Frontend App         |
| [server](server)      |      Backend App          |

# RUN WITH DOCKER

_Prerequisite: [Install Docker](https://docs.docker.com/install) on your local environment._

To get started, read and follow the instructions in [Developing inside a Container](https://code.visualstudio.com/docs/remote/containers).

- Install the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.
- Open VSCode and bring up the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette).

> If you need to modify environment variables for backend, you need to modify them inside `/home/docker-compose.yml` file and restart your terminal.

# Manual Full Local Development Using Docker
#### `server`
Navigate to `/server` and create a `.env` file with the following environment variables in the root directory `/server/.env`:
```bash
PORT=4000
SITE_NAME="Course Project"
DEFAULT_DOMAIN="localhost"
APP_PROTOCOL="http"
APP_DOMAIN="localhost"
LINK_LENGTH= 6 
SENTRY_PRIVATE_DSN=""
SENTRY_PUBLIC_DSN=""
LOG_JSON_STYLE=true
LOG_DATE_FORMAT="YYYY-MM-DD HH:mm:ss"
LOG_INFO_MAX_SIZE=5242880
LOG_INFO_MAX_FILES=100
LOG_INFO_COLORIZE=true
LOG_ERROR_MAX_SIZE=5242880
LOG_ERROR_MAX_FILES=100
LOG_ERROR_COLORIZE=true
```

Run the following commands:
```shell
docker build -t server .
docker run -d -p 4000:4000 --name server server
```
#### `client`
Navigate to `/client`  and create a `.env` file with the following environment variables in the root directory `/client/.env`:
```
BACKEND_URL="http://localhost:4000/api"
```

Run the following commands:
```shell
docker build -t client .
docker run -d -p 8080:8080 --name client client
```

## USING DOCKER COMPOSE
Run the following commands:
```bash 
docker-compose up
```

# RUN WITHOUT DOCKER
#### `server`
Navigate to [server](server) and create a `.env` file with the following environment variables in the root directory [server](server)`/.env`:

```bash
PORT=4000
SITE_NAME="Course Project"
DEFAULT_DOMAIN="localhost"
APP_PROTOCOL="http"
APP_DOMAIN="localhost"
LINK_LENGTH= 6 
SENTRY_PRIVATE_DSN=""
SENTRY_PUBLIC_DSN=""
LOG_JSON_STYLE=true
LOG_DATE_FORMAT="YYYY-MM-DD HH:mm:ss"
LOG_INFO_MAX_SIZE=5242880
LOG_INFO_MAX_FILES=100
LOG_INFO_COLORIZE=true
LOG_ERROR_MAX_SIZE=5242880
LOG_ERROR_MAX_FILES=100
LOG_ERROR_COLORIZE=true
```
#### `client`
Navigate to [client](client) and create a `.env` file with the following environment variables in the root directory [client](client)`/.env`:
```
BACKEND_URL="http://localhost:4000/api"
```
# Manual Full Local Development

## 1. Install App (frontend and backend)
```bash
npm run install:app
```
## 2. Build App (frontend and backend)
```bash
npm run build:app
```
# 3. BACKEND
## Run backend app in dev mode
```bash
npm run start-server:dev
```
## Run backend app in prod mode
```bash
npm run start-server:prod
```
## 4. FRONTEND
## Run frontend app in dev mode
```bash
npm run start-client:dev
```
## Run frontend app in dev mode
Use the build file in the `dist` folder to run the frontend app in production mode

- You can refer to the container deployment guide above for more information.
