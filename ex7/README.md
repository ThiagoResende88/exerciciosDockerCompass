# Exercício 7 - Rede Docker para Comunicação entre Containers

## Objetivo
Criar uma rede Docker personalizada para conectar containers Node.js e MongoDB, permitindo comunicação segura e isolada entre os serviços.

---

## Tecnologias Utilizadas
- Docker
- Node.js (Express)
- MongoDB
- Docker Compose

---

## Passo a Passo

### 1. Criar a estrutura do projeto
```
ex7/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

### 2. Configurar a aplicação Node.js (`backend/server.js`)
```javascript
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Conectar ao MongoDB
mongoose.connect('mongodb://mongo:27017/mydb', { useNewUrlParser: true });

app.get('/', (req, res) => {
  res.send('Aplicação Node.js conectada ao MongoDB!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

### 3. Dockerfile para o backend
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

### 4. Configurar o docker-compose.yml
```yaml
version: '3.8'

services:
  mongo:
    image: mongo:latest
    container_name: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    networks:
      - app-network

  backend:
    build: ./backend
    container_name: backend
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    networks:
      - app-network
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password

networks:
  app-network:
    driver: bridge

volumes:
  mongo_data:
```

### 5. Executar o sistema
```bash
docker-compose up -d --build
```

### 6. Testar a aplicação
```bash
curl http://localhost:3000
```
** Resposta esperada: "Aplicação Node.js conectada ao MongoDB!"**

---

## Análise de Resultados

### Verificação da Rede
```bash
docker network inspect ex7_app-network
```

### Conexão entre Containers
** Acessar o container do Node.js e testar conexão com MongoDB**
```bash
docker exec -it backend ping mongo
```

---

## Comandos Importantes
```
| Comando                                            | Descrição                 |
|----------------------------------------------------|---------------------------|
| `docker-compose up -d`                             | Inicia os serviços em background |
| `docker network ls`                                | Lista redes disponíveis   |
| `docker-compose logs`                              | Mostra logs dos serviços  |
| `docker exec -it mongo mongo -u admin -p password` | Acessa o shell do MongoDB |
```

---

## Estrutura da Rede

```
[ Backend (Node.js) ] <---> [ Rede Docker ] <---> [ MongoDB ]
```

### Características da Rede:
- Isolamento de outros containers
- Comunicação segura entre serviços
- DNS automático entre containers

---

## Dificuldades e Soluções

1. **Problema**: Conexão recusada entre containers  
   **Solução**: Verificar se ambos estão na mesma rede e usar nomes de serviço como hostnames

2. **Problema**: MongoDB não inicializando  
   **Solução**: Adicionar variáveis de ambiente para autenticação

3. **Problema**: Aplicação Node falhando ao conectar  
   **Solução**: Adicionar `depends_on` e verificar string de conexão

---

## Melhores Práticas Aplicadas

✔️ Rede isolada para comunicação segura  
✔️ Uso de DNS interno do Docker (nomes de serviço)  
✔️ Variáveis de ambiente para configurações sensíveis  
✔️ Volume persistente para dados do MongoDB  

---

## Referências
- [Docker Networking Documentation](https://docs.docker.com/network/)
- [MongoDB Docker Image](https://hub.docker.com/_/mongo)
- [Docker Compose Best Practices](https://docs.docker.com/compose/best-practices/)

---


# Resposta esperada: "Aplicação Node.js conectada ao MongoDB!"

---

## Análise de Resultados

### Verificação da Rede
```bash
docker network inspect ex7_app-network
```

### Conexão entre Containers
** Acessar o container do Node.js e testar conexão com MongoDB**
```bash
docker exec -it backend ping mongo
```

---

## Comandos Importantes
```
| Comando                                            | Descrição                        | 
|----------------------------------------------------|----------------------------------|
| `docker-compose up -d`                             | Inicia os serviços em background |
| `docker network ls`                                | Lista redes disponíveis          |
| `docker-compose logs`                              | Mostra logs dos serviços         |
| `docker exec -it mongo mongo -u admin -p password` | Acessa o shell do MongoDB        |
```
---

## Estrutura da Rede

```
[ Backend (Node.js) ] <---> [ Rede Docker ] <---> [ MongoDB ]
```

### Características da Rede:
- Isolamento de outros containers
- Comunicação segura entre serviços
- DNS automático entre containers

---

## Dificuldades e Soluções

1. **Problema**: Conexão recusada entre containers  
   **Solução**: Verificar se ambos estão na mesma rede e usar nomes de serviço como hostnames

2. **Problema**: MongoDB não inicializando  
   **Solução**: Adicionar variáveis de ambiente para autenticação

3. **Problema**: Aplicação Node falhando ao conectar  
   **Solução**: Adicionar `depends_on` e verificar string de conexão

---

## Melhores Práticas Aplicadas

✔️ Rede isolada para comunicação segura  
✔️ Uso de DNS interno do Docker (nomes de serviço)  
✔️ Variáveis de ambiente para configurações sensíveis  
✔️ Volume persistente para dados do MongoDB  

---

## Referências
- [Docker Networking Documentation](https://docs.docker.com/network/)
- [MongoDB Docker Image](https://hub.docker.com/_/mongo)
- [Docker Compose Best Practices](https://docs.docker.com/compose/best-practices/)

---
