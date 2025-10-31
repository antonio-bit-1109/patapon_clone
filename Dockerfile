# Stage 2 - runtime
FROM nginx:stable-alpine
# Copia i file statici della build nella directory servita da Nginx
COPY ./dist /usr/share/nginx/html
# Espone la porta 80 (default Nginx)
EXPOSE 80
# Comando di default
CMD ["nginx", "-g", "daemon off;"]