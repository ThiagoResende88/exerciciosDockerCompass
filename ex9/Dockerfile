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
