# Exercício 5 - Criando e utilizando volumes para persistência de dados

## Objetivo
Configurar um volume Docker para persistir dados de um container MySQL, garantindo que as informações do banco de dados não sejam perdidas após reiniciar ou remover o container.

---

## Passo a Passo

### 1. Criar o arquivo `docker-compose.yml`
Criar um arquivo YAML para definir o serviço MySQL e o volume:
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:latest
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: appdb
      MYSQL_USER: appuser
      MYSQL_PASSWORD: apppass
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"

volumes:
  mysql_data:
```

### 2. Iniciar o container
```bash
docker-compose up -d
```

### 3. Verificar containers em execução
```bash
docker ps
```
**Saída esperada:**
```
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PAMES
76f6ab99be23   mysql:latest   "docker-entrypoint.s…"   5 seconds ago   Up 4 seconds   0.0.0.0:3306->3306/tcp
```

### 4. Inserir dados no MySQL
Conectar ao container e criar uma tabela:
```bash
docker exec -it ex5_mysql_1 mysql -u appuser -papppass appdb
```
```sql
CREATE TABLE teste (id INT, nome VARCHAR(20));
INSERT INTO teste VALUES (1, 'Docker Volume');
exit
```

### 5. Parar e remover o container
```bash
docker-compose down
```

### 6. Reiniciar o container e verificar persistência
```bash
docker-compose up -d
docker exec -it ex5_mysql_1 mysql -u appuser -papppass appdb -e "SELECT * FROM teste;"
```
**Saída esperada:**
```
+------+---------------+
| id   | nome          |
+------+---------------+
|    1 | Docker Volume |
+------+---------------+
```

---

## Comandos Utilizados
```
| Comando | Descrição |
|---------|-----------|
| `docker-compose up -d` | Inicia os containers em segundo plano. |
| `docker ps` | Lista containers em execução. |
| `docker exec -it ex5_mysql_1 mysql ...` | Executa o cliente MySQL dentro do container. |
| `docker-compose down` | Para e remove os containers. |
```
---

## Evidências de Execução
1. **Volume criado:**  


2. **Dados persistidos após reinício:**  


---
