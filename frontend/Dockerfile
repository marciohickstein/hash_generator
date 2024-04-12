# Use a imagem oficial do Node.js como base
FROM node:alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do projeto para o diretório de trabalho no contêiner
COPY . .

# Instale as dependências do projeto
RUN npm install

# Expõe a porta 5173 para o acesso externo
EXPOSE 8888

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["npm", "run", "dev"]
