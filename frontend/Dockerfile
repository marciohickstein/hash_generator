FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 8888

CMD ["npm", "run", "dev"]
