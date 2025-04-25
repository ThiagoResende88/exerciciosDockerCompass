# Estágio de construção
FROM python:3.9-slim as builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --prefix=/install -r requirements.txt

# Estágio final
FROM python:3.9-slim

WORKDIR /app
COPY --from=builder /install /usr/local
COPY app.py .

# Configura usuário não-root
RUN useradd -m appuser && \
    chown -R appuser:appuser /app

USER appuser
EXPOSE 5000
CMD ["python", "app.py"]
