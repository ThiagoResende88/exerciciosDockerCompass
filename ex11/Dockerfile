FROM python:3.9-slim  # Imagem mais enxuta e atualizada
RUN apt-get update && apt-get upgrade -y  # Atualiza pacotes do sistema
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt  # Evita cache para reduzir tamanho
COPY . .
USER appuser  # Executa como usuário não-root (exercício 10)
CMD ["python", "app.py"]
