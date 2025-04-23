# Exercício 3: Gerenciamento de Containers 🗃️

**Objetivo**:  
Praticar comandos Docker para listar, parar e remover containers.

---

## 📋 Passo a Passo

### 1. Listar todos os containers (executando e parados)
```bash
docker ps -a
```
**Saída esperada**:
```
CONTAINER ID   IMAGE          STATUS                      NAMES
a1b2c3d4e5f6   nginx:alpine   Up 2 minutes                meu-nginx
x7y8z9q1w2e3   ubuntu:latest  Exited (0) 5 minutes ago    ubuntu-interativo
```

### 2. Parar um container em execução
```bash
docker stop meu-nginx  # Substitua pelo NOME ou ID do container
```

### 3. Remover um container específico
```bash
docker rm ubuntu-interativo  # Remove pelo nome
# OU
docker rm a1b2c3d4e5f6       # Remove pelo ID
```

### 4. Remover múltiplos containers de uma vez
```bash
docker rm $(docker ps -aq)  # Remove TODOS os containers parados
```

---

## 📌 Comandos Úteis
```
| Comando                |                    Descrição                    |
|------------------------|-------------------------------------------------|
| `docker ps`            |                    Lista containers em execução |
| `docker ps -a --filter "status=exited"` |   Lista containers parados     |
| `docker stop $(docker ps -q)` |      Para TODOS os containers em execução|
| `docker container prune` |            Remove todos os containers parados |
```

---

## 🖥️ Estrutura do Projeto
```
ex3/
├── README.md                # Este arquivo
├── comandos.txt             # (Opcional) Lista de comandos usados
└── prints/                  # (Opcional) Capturas de tela
    ├── print1.png  
    └── print2.png
```

---

## 🔍 Exemplo Prático
1. **Crie dois containers para teste**:
   ```bash
   docker run -d --name nginx-test nginx:alpine
   docker run -d --name ubuntu-test ubuntu sleep 300
   ```

2. **Liste e filtre**:
   ```bash
   docker ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"
   ```

3. **Remova seletivamente**:
   ```bash
   docker stop nginx-test && docker rm nginx-test
   ```

---

## 🚨 Solução de Problemas
- **Erro "container is running"**:  
  Pare o container antes de removê-lo:
  ```bash
  docker stop <nome> && docker rm <nome>
  ```

- **Erro "No such container"**:  
  Verifique o nome exato com:
  ```bash
  docker ps -a
  ```

---

## 📸 Evidência de Execução
![Imagem colada](https://github.com/user-attachments/assets/b318d47c-178b-42db-9ecf-4045322f1cb9)
![Imagem colada (2)](https://github.com/user-attachments/assets/94c54f1b-3320-48d2-905c-3bd67e6fd869)
*Exemplo: Saída de `docker ps -a` mostrando containers ativos e parados*

---

## 💡 Dica Avançada
Para **automatizar a limpeza** de containers não utilizados:
```bash
# Remove containers parados com mais de 24h
docker container prune --filter "until=24h"
```

---

## 🧠 Teste Seu Conhecimento
1. Qual comando lista **somente os IDs** dos containers?
   ```bash
   docker ps -aq
   ```

2. Como forçar a remoção de um container **sem pará-lo primeiro**?
   ```bash
   docker rm -f <nome>
   ```

