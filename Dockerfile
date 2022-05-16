FROM nginx:1.21-alpine
WORKDIR /app
COPY index.html /usr/share/nginx/html
COPY script2.js /usr/share/nginx/html
COPY smallscreen.css /usr/share/nginx/html
COPY style.css /usr/share/nginx/html
EXPOSE 80
