FROM node:16-alpine

# 1. Cria usuário seguro
RUN adduser -D appuser && \
    mkdir -p /app && \
    chown appuser:appuser /app

# 2. Configura diretório de trabalho
WORKDIR /app

# 3. Copia APENAS os arquivos de dependência primeiro (otimização de cache)
COPY --chown=appuser:appuser package*.json ./

# 4. Instala dependências
RUN npm install

# 5. Copia TODO o conteúdo da pasta app (incluindo server.js)
COPY --chown=appuser:appuser ./app .

# 6. Configura usuário e porta
USER appuser
EXPOSE 3000

# 7. Ponto de entrada
CMD ["node", "server.js"]
