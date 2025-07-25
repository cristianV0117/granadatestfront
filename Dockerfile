# Etapa 1: Build
FROM node:22.12.0 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --output-path=dist

# Etapa 2: Servir con NGINX
FROM nginx:stable-alpine

COPY --from=builder /app/dist/granadatestfront /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
