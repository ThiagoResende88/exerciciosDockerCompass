## **Exercício 11: Análise de Imagem Docker com Trivy**

### **Objetivo**
Analisar a imagem `python:3.9` utilizando o Trivy para identificar vulnerabilidades críticas e propor melhorias.

### **Passos Executados**

1. **Instalação do Trivy**
   ```bash
   curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin
   trivy --version
   ```

2. **Análise da Imagem**
   ```bash
   trivy image python:3.9
   ```

3. **Resultados Obtidos**
   - **Total de Vulnerabilidades**: 3 (HIGH: 2, CRITICAL: 1)
   - **Principais Vulnerabilidades**:
     - `openssl` (CVE-2023-2650) - CRITICAL
     - `libsystemd0` (CVE-2022-3821) - HIGH

4. **Recomendações**
   - Atualizar para imagem `python:3.9-slim`
   - Executar `apt-get update && apt-get upgrade` no Dockerfile
   - Atualizar dependências no `requirements.txt`

### **Evidências**
- [Captura de Tela da Análise](prints/resultado_final.png)

### **Comandos Utilizados**
```bash
# Instalação
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin

# Análise
trivy image python:3.9

# Filtro para vulnerabilidades críticas
trivy image --severity HIGH,CRITICAL python:3.9
```

### **Melhorias Aplicadas**
1. Substituição da imagem base por `python:3.9-slim`
2. Adição de comandos para atualização de pacotes
3. Criação de usuário não-root (relacionado ao Exercício 10)

```dockerfile
FROM python:3.9-slim

RUN apt-get update && apt-get upgrade -y

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

USER appuser
CMD ["python", "app.py"]
```

---

## **Como Executar**
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/exercicios-docker-2025.git
   cd exercicios-docker-2025/ex11
   ```

2. Execute a análise:
   ```bash
   docker build -t python-app .
   trivy image python-app
   ```

---

## **Referências**
- [Documentação Oficial do Trivy](https://aquasecurity.github.io/trivy/)
- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)

**Autor**: Thiago Dias Resende
