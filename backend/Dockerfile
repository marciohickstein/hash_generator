FROM node:24-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./

# Desenvolvimento (docker-compose.dev.yml): inclui devDependencies, como o nodemon.
FROM base AS dev

ENV NODE_ENV=development

RUN npm ci

COPY . .

EXPOSE 3003

USER node

CMD ["npm", "run", "dev"]

# Producao (alvo padrao, por ser o ultimo estagio): so dependencias de runtime.
FROM base AS prod

ENV NODE_ENV=production

RUN npm ci --omit=dev

COPY . .

EXPOSE 3003

USER node

CMD ["node", "server.js"]
