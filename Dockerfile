# Use uma imagem base que inclua o Node.js
FROM node:14

# Define o diretório de trabalho dentro do contêiner
WORKDIR /var/www/html/fanwitch

# Copia os arquivos do projeto para o contêiner
COPY . .

# Instala as dependências
RUN npm install

# Expõe a porta 8080 (ou a porta que você deseja usar para acessar o Vue.js)
EXPOSE 3000

# Comando padrão para iniciar o servidor de desenvolvimento do Vue.js
CMD ["npm", "run", "dev", "--host", "0.0.0.0"]
