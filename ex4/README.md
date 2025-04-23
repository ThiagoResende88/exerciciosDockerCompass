# Exercício 4 - Aplicação Flask com Docker

## Descrição
Este exercício demonstra a containerização de uma aplicação Flask simples usando Docker, com mapeamento de portas e construção de imagem personalizada.

## Estrutura do Projeto
```
exerciciosDockerCompass/ex4/
├── awesome-compose/
│   └── flask/
│       ├── app/
│       │   ├── Dockerfile
│       │   ├── app.py
│       │   └── requirements.txt
│       └── compose.yaml
├── README.md
└── prints
```

## Tecnologias Utilizadas
- Docker
- Docker Compose
- Flask (Python)

## Como Executar

### Opção 1: Usando Docker Compose (recomendado)
```bash
docker compose up -d
```
**Acesse: http://localhost:8000**

### Opção 2: Usando Docker CLI

# Construa a imagem
```
docker build -t flask-app ./awesome-compose/flask/app
```

# Execute o container
```
docker run -d -p 8000:8000 flask-app
```
**Acesse: http://localhost:8000**

---

## Comandos Úteis
- Verificar containers em execução:
  ```bash
  docker compose ps
  # ou
  docker ps
  ```

- Parar serviços:
  ```bash
  docker compose down
  # ou
  docker stop <container_id>
  ```

- Visualizar logs:
  ```bash
  docker compose logs
  # ou
  docker logs <container_id>
  ```

## Verificação do Resultado
Após executar o container, você deverá ver:
1. No terminal:
   ```
   * Running on http://0.0.0.0:8000
   ```
2. No navegador (http://localhost:8000):
   ```
   Hello World!
   ```

## Personalização
Para modificar a aplicação:
1. Edite o arquivo `app.py`:
   ```python
   @app.route('/')
   def hello():
       return "Nova mensagem!"
   ```
2. Reconstrua a imagem e recrie os containers

## Observações
- Certifique-se de que as portas 8000 não estejam sendo usadas por outros serviços
- O Dockerfile utiliza construção multi-stage para otimização

## Links Úteis
- [Documentação Flask](https://flask.palletsprojects.com/)
- [Docker para aplicações Python](https://docs.docker.com/language/python/)

