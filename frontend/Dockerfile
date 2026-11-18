FROM node:alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY backend_proxy.conf /etc/nginx/backend_proxy.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
