FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# Commit exibido no rodape; o deploy passa via docker-compose.yml.
ARG GIT_COMMIT=""
ENV GIT_COMMIT=$GIT_COMMIT

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY backend_proxy.conf /etc/nginx/backend_proxy.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
