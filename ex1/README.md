# Exercício 1: Container Nginx com TailwindCSS 🚀

**Objetivo**:  
Criar um container Docker com Nginx para hospedar a landing page do [TailwindCSS](https://github.com/tailwindtoolbox/Landing-Page).

---

## 📋 Passo a Passo

### 1. Clonar o repositório da landing page
```
git clone https://github.com/tailwindtoolbox/Landing-Page.git
cd Landing-Page
```

### 2. Criar o Dockerfile
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
```

### 3. Construir a imagem Docker
```
docker build -t nginx-tailwind .
```

### 4. Executar o container
```
docker run -d -p 80:80 --name meu-site nginx-tailwind
```

## 🌐 Acesso
Abra no navegador:
👉 http://localhost:80


## 📌 Comandos Úteis
Comando	                Descrição
docker ps	        Verificar container em execução
docker stop meu-site	Parar o container
docker rm meu-site	Remover o container
docker images	        Listar imagens locais


##🖥️ Estrutura do Projeto
```
ex1/
├── Dockerfile                # Configuração do container
├── site/                     # Arquivos do TailwindCSS (copiados do repositório)
│   ├── index.html
│   ├── css/
│   └── img/
└── README.md                 # Este arquivo
```

##🔍 Verificação
Para confirmar que o container está funcionando:

```
docker exec meu-site nginx -v
```

**Saída esperada:**
nginx version: nginx/1.23.4 (ou similar)


## 🚨 Solução de Problemas
Erro "Porta 80 em uso":
Altere a porta do host no comando docker run:

```
docker run -d -p 8080:80 --name meu-site nginx-tailwind
Acesse então: http://localhost:8080
```

Página não carrega:
Verifique os logs do container:

```
docker logs meu-site
```

## 💡 Dica Extra
Para editar o site:

Modifique os arquivos HTML/CSS na pasta **site/**

Reconstrua a imagem:
```
docker build -t nginx-tailwind .
```

Recrie o container:
```
docker rm -f meu-site && docker run -d -p 80:80 --name meu-site nginx-tailwind
```
