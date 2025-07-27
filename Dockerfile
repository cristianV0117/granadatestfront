# Etapa 1: build de Angular
FROM node:22.12.0 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --output-path=dist

# Etapa 2: servir con NGINX
FROM nginx:stable-alpine

# Cambia "dist" si tu app genera algo como "dist/granadatestfront"
COPY --from=builder /app/dist/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]