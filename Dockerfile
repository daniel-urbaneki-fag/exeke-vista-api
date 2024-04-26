# Base image
 # Altere para o compilador da linguagem que você está usando.
FROM node:latest

# Cria o diretório de trabalho app
WORKDIR /app

# Copias ambos os arquivos package.json e yarn.lock
COPY package.json .

# Instala as dependencias
RUN npm i

# Copia os arquivos de código fonte para o diretorio de trabalho
COPY . .

# Adiciona toda a configuração do prisma ORM
# COPY prisma prisma

# Gera o prisma client e atualiza o prisma schema
# RUN npm prisma generate 

# Expoê a porta 3010 para o protocolo TCP/IP
EXPOSE 8080

# Faz a build do código fonte
CMD ["npm", "start"]
