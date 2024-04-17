FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3003

CMD [ "npm", "run", "dev" ]