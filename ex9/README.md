# Exercício 9 - Imagem Personalizada com Nginx e Site Estático

## Objetivo
Criar uma imagem Docker personalizada baseada no Nginx com uma landing page estática moderna (Creative Tim), configurando um servidor web eficiente.

---

## Tecnologias Utilizadas
- Docker
- Nginx
- HTML/CSS/JS estático
- Creative Tim Template

---

## Passo a Passo

### 1. Estrutura do Projeto
```
ex9/
├── Dockerfile
├── nginx.conf
├── public/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
└── README.md
```

### 2. Baixar Template (Creative Tim)
1. Acesse [Creative Tim](https://www.creative-tim.com/)
2. Escolha um template gratuito (ex: Argon Design System)
3. Extraia os arquivos na pasta `public/`

### 3. Dockerfile
```dockerfile
FROM nginx:1.23-alpine

# Remover configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuração customizada
COPY nginx.conf /etc/nginx/conf.d

# Copiar arquivos estáticos
COPY public /usr/share/nginx/html

# Expor porta e iniciar Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 4. nginx.conf (Otimizado)
```nginx
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
        expires 1y;
        access_log off;
        add_header Cache-Control "public";
    }

    # Compressão
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
}
```

### 5. Construir e Executar

# Construir imagem
```bash
docker build -t nginx-landing-page .
```

# Executar container
```bash
docker run -d -p 8080:80 --name landing-page nginx-landing-page
```

---

## Acesso e Testes
Acesse no navegador:
```navegador
http://localhost:8080
```

**Verifique otimizações:**

# Testar compressão
```bash
curl -H "Accept-Encoding: gzip" -I http://localhost:8080
```

# Verificar headers
```bash
curl -I http://localhost:8080
```

---

## Otimizações Implementadas
- **Imagem Alpine** (89% menor que a padrão)
- **Cache de Arquivos Estáticos** (headers HTTP)
- **Compressão GZIP** (redução de ~70% no tamanho)
- **Configuração Nginx Customizada**
- **Multi-stage Build** (opcional para projetos complexos)

---

## Comandos Úteis
```
| Comando                                         | Descrição                 |
|-------------------------------------------------|---------------------------|
| `docker exec -it landing-page nginx -T`         | Testar configuração Nginx |
| `docker cp landing-page:/var/log/nginx/ ./logs` | Extrair logs              |
| `docker stats landing-page`                     | Monitorar recursos        |
```
---

## Dificuldades e Soluções

1. **Problema**: Página não carrega CSS/JS  
   **Solução**: Verificar paths nos arquivos HTML e configurar Nginx para servir corretamente

2. **Problema**: Erro 403 Forbidden  
   **Solução**: Garantir que permissões da pasta `public` estão corretas (755)

3. **Problema**: Cache muito agressivo  
   **Solução**: Ajustar headers no nginx.conf conforme necessário

---

## Melhores Práticas
✔️ Uso de imagem Alpine para redução de tamanho  
✔️ Configuração otimizada do Nginx  
✔️ Headers de cache apropriados  
✔️ Isolamento de arquivos de configuração  
✔️ Logs centralizados  

---

## Referências
- [Nginx Docker Official](https://hub.docker.com/_/nginx)
- [Creative Tim Templates](https://www.creative-tim.com/)
- [Nginx Optimization Guide](https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/)

---

## Autor
Thiago Resende  
[Repositório GitHub](https://github.com/ThiagoResende88/exerciciosDockerCompass/tree/main/ex9)
```
