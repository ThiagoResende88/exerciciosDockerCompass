# Exercício 2: Container Ubuntu Interativo 💻

**Objetivo**:  
Criar um container Docker interativo com Ubuntu para executar comandos e scripts Bash.

---

## 📋 Passo a Passo

### 1. Iniciar o container Ubuntu em modo interativo
```
docker run -it --name ubuntu-interativo ubuntu:latest bash
```

### 2. Dentro do container, execute:
```
apt update && apt install -y htop nano   # Instala ferramentas úteis
htop                                     # Monitoramento do sistema
echo "Hello from Docker!" > teste.txt    # Cria um arquivo
exit                                     # Sai do container
```

### 3. Para reiniciar o container depois de sair:
```
docker start -ai ubuntu-interativo
```

---

## 📌 Comandos Úteis
```
| Comando                              | Descrição |
|--------------------------------------|-----------------------------------------------|
| `docker ps -a`                       | Lista todos os containers (incluindo parados) |
| `docker rm ubuntu-interativo`        | Remove o container                            |
| `docker exec ubuntu-interativo ls`   | Executa comando no container em execução      |
```

---

## 🖥️ Estrutura do Projeto
```
ex2/
├── README.md               # Este arquivo
├── scripts/               # (Opcional) Pasta para scripts de exemplo
│   └── system-info.sh      # Exemplo de script para testar no container
└── prints/                # (Opcional) Capturas de tela
    └── terminal.png       # Print da sessão interativa
```

---

## 📝 Exemplo de Script (`system-info.sh`)
Crie este arquivo na pasta `scripts/` para testar no container:
```
#!/bin/bash
echo "=== System Info ==="
echo "Hostname: $(hostname)"
echo "CPU Cores: $(nproc)"
echo "Memory: $(free -h | grep Mem | awk '{print $2}')"
```
**Como usar no container**:
1. Copie o script para o container:
   ```bash
   docker cp scripts/system-info.sh ubuntu-interativo:/tmp/
   ```
2. Execute dentro do container:
   ```bash
   bash /tmp/system-info.sh
   ```

---

## 🚨 Solução de Problemas
- **Erro "Unable to locate package"**:  
  Execute `apt update` antes de instalar pacotes.

- **Container não inicia**:  
  Verifique se o nome não está em uso:
  ```
  docker rm ubuntu-interativo  # Remove se existir
  docker run -it --name ubuntu-interativo ubuntu bash
  ```

---

## 📸 Evidência de Execução

![Imagem colada (2)](https://github.com/user-attachments/assets/ce16185d-f94a-4e8a-99fe-481d488e9cc5)
*Exemplo: Saída do comando `htop` no container*

---

## 💡 Dica Avançada
Para mapear um diretório local para o container (ex: compartilhar scripts):
```
docker run -it -v $(pwd)/scripts:/scripts --name ubuntu-interativo ubuntu bash
```
Acesse os scripts em `/scripts` dentro do container.

```

### Como implementar:
1. Crie a estrutura de pastas dentro de `ex2/`:
   ```
   mkdir -p ex2/{scripts,prints}
   ```

2. Adicione os arquivos:
   - Cole o conteúdo acima em `ex2/README.md`
   - Crie o script de exemplo em `ex2/scripts/system-info.sh`
   - Adicione prints de execução em `ex2/prints/` (opcional)

3. (Opcional) Documente os comandos usados:
   ```
   echo "docker run -it --name ubuntu-interativo ubuntu bash" > ex2/comandos.txt
   ```

---

