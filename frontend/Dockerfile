# Use a imagem oficial do Node.js como base
FROM node:alpine

# Defina o diret�rio de trabalho dentro do cont�iner
WORKDIR /app

# Copie os arquivos do projeto para o diret�rio de trabalho no cont�iner
COPY . .

# Instale as depend�ncias do projeto
RUN npm install

# Exp�e a porta 5173 para o acesso externo
EXPOSE 8888

# Comando para iniciar a aplica��o quando o cont�iner for iniciado
CMD ["npm", "run", "dev"]
