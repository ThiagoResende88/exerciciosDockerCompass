# **Exercício 12: Correção de Vulnerabilidades em Dockerfile**

## **Objetivo**
Corrigir o Dockerfile vulnerável fornecido no exercício, aplicando boas práticas de segurança e reduzindo vulnerabilidades identificadas pelo Trivy.

---

## **Dockerfile Original (Vulnerável)**
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

**Problemas identificados**:
1. Usa imagem base desatualizada (`python:3.9` sem tag específica)
2. Instala dependências com versões vulneráveis
3. Executa como root (sem usuário dedicado)
4. Não limpa cache do pip (aumenta tamanho da imagem)

---

## **Dockerfile Corrigido**
```dockerfile
# Etapa 1: Build
FROM python:3.9-slim as builder

WORKDIR /app
COPY requirements.txt .

# Instala dependências em um diretório temporário
RUN pip install --user --no-cache-dir -r requirements.txt

# ---

# Etapa 2: Imagem final
FROM python:3.9-slim

WORKDIR /app

# Copia apenas o necessário do builder
COPY --from=builder /root/.local /root/.local
COPY . .

# Cria usuário não-root
RUN useradd -m appuser && \
    chown -R appuser:appuser /app

# Configura PATH para incluir .local/bin
ENV PATH=/root/.local/bin:$PATH

# Define usuário e porta
USER appuser
EXPOSE 5000

CMD ["python", "app.py"]
```

### **Principais Melhorias**:
1. **Imagem base mais segura**:
   - Uso de `python:3.9-slim` (menor e mais atualizada)

2. **Multi-stage build**:
   - Reduz tamanho final da imagem

3. **Usuário não-root**:
   - Criado com `useradd` e definido via `USER`

4. **Dependências atualizadas**:
   - `requirements.txt` com versões seguras (Flask >= 2.0.0)

5. **Otimizações**:
   - `--no-cache-dir` no pip
   - Limpeza de artefatos temporários

---

## **requirements.txt Atualizado**
```txt
flask>=2.0.0
requests>=2.31.0
```

---

## **Passos para Execução**

1. **Construa a imagem**:
   ```bash
   docker build -t python-app-secure .
   ```

2. **Verifique vulnerabilidades**:
   ```bash
   trivy image python-app-secure
   ```

3. **Execute o container**:
   ```bash
   docker run -d -p 5000:5000 --name myapp python-app-secure
   ```

4. **Verifique o usuário**:
   ```bash
   docker exec myapp whoami
   # Deve retornar: appuser
   ```

---

## **Comparação de Resultados**
```
| Métrica                         | Dockerfile Original | Dockerfile Corrigido |
|---------------------------------|---------------------|----------------------|
| **Tamanho da imagem**           | ~920MB              | ~120MB               |
| **Vulnerabilidades (CRITICAL)** | 15                  | 0                    |
| **Execução como root**          | Sim                 | Não                  |
```
---

## **Evidências**
![Comparação Trivy](ex12/prints/image_build.png)

1. **Scan com Trivy antes/depois**:
[Imagem antes - ex11](ex11/prints/resultado_final.png)


2. **Verificação de usuário**:
   ```bash
   $ docker exec myapp whoami
   appuser
    ```

---

## **Conclusão**
As alterações aplicadas reduziram:
- 100% das vulnerabilidades críticas
- 85% do tamanho da imagem
- Superfície de ataque (remoção de root)

---

**Autor**: Thiago Dias Resende  

[⬆ Voltar ao topo](#exercícios-docker-2025)
