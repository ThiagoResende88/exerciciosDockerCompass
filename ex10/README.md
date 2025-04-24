# Exercício 10 - Execução de Containers como Usuário Não-Root

## Objetivo
Configurar um Dockerfile para executar uma aplicação Node.js com um usuário não-root, seguindo princípios de segurança mínimos privilegios.

---

## Tecnologias Utilizadas
- Docker
- Node.js
- Linux (usuários/grupos)

---

## Passo a Passo

### 1. Estrutura do Projeto
```
ex10/
├── app/
│   ├── server.js
│   └── package.json
├── Dockerfile
└── README.md
```

### 2. Aplicação Node.js Básica (`app/server.js`)
```javascript
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Container rodando como usuário não-root!\n');
});
server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
```

### 3. Dockerfile Seguro
```dockerfile
FROM node:16-alpine

# Etapa de construção como root
WORKDIR /app
COPY package*.json ./
RUN npm install && \
    apk add --no-cache su-exec

# Cria usuário não-privilegiado
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

# Muda para usuário não-root
USER appuser

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
```

### 4. Build e Execução
```bash
# Construir imagem
docker build -t node-non-root .

# Executar container
docker run -d -p 3000:3000 --name safe-container node-non-root

# Verificar usuário
docker exec safe-container whoami
# Deve retornar: appuser
```

---

## Verificações de Segurança

### 1. Confirmar usuário do processo
```bash
docker exec safe-container ps aux
```

### 2. Testar escrita em diretório
```bash
docker exec safe-container touch /tmp/test.txt
docker exec safe-container touch /app/test.txt
```

### 3. Inspecionar permissões
```bash
docker exec safe-container ls -la /app
```

---

## Melhores Práticas Implementadas

✔️ Criação de usuário e grupo dedicados  
✔️ Uso de `USER` antes do `COPY` final  
✔️ Redução de camadas com `&&`  
✔️ Remoção de cache do apk após instalação  
✔️ Uso de imagens oficiais Alpine  

---

## Tabela de Comandos Úteis
```
| Comando                                                  | Descrição                    |
|----------------------------------------------------------|------------------------------|
| `docker exec <container> whoami`                         | Verifica usuário atual       |
| `docker exec <container> id`                             | Mostra UID/GID               |
| `docker inspect <container> --format '{{.Config.User}}'` | Verifica usuário configurado |
```

---

## Dificuldades e Soluções

1. **Problema**: Erro de permissão ao instalar dependências  
   **Solução**: Fazer `npm install` como root antes de mudar de usuário

2. **Problema**: Aplicação não consegue escrever logs  
   **Solução**: Criar volume com permissões corretas:
   ```dockerfile
   RUN mkdir -p /app/logs && chown appuser:appgroup /app/logs
   VOLUME /app/logs
   ```

3. **Problema**: Porta privilegiada (ex: 80)  
   **Solução**: Mapear para porta alta (>1024) no host:
   ```bash
   docker run -p 8080:3000
   ```

---

## Referências
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)
- [Official Node.js Docker Guidelines](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [Princípio do Menor Privilégio](https://en.wikipedia.org/wiki/Principle_of_least_privilege)

---

## Autor
Thiago Resende  
[Repositório GitHub](https://github.com/ThiagoResende88/exerciciosDockerCompass/tree/main/ex10)
