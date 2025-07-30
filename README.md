# 🌍 GranadaTest Frontend - Angular App - Cristian Vasquez

Frontend para el reto técnico FullStack de **Granada**, desarrollado con **Angular**, **SCSS**, **Bootstrap 5** y desplegado en **Railway**. Este frontend consume un backend en Laravel vía **GraphQL** para consultar países con mayor densidad demográfica y gestionar logs de uso.

---

## 📦 Tecnologías usadas

- **Angular 20**
- **SCSS**
- **Bootstrap 5**
- **GraphQL**
- **RxJS / NgRx (Store y efectos)**
- **Docker + NGINX**
- **Railway (deploy frontend)**
- **GitHub Actions (build y release)**

---

## ⚙️ Funcionalidad

### Módulo 1: Consulta de países con mayor densidad
- Captura un **nombre de usuario** y el **número de países a consultar**.
- Solicita al backend vía GraphQL los países con mayor densidad poblacional.
- Muestra los resultados paginados (10 por página, hasta 50 países).
- Guarda automáticamente un **log** de cada consulta (username, timestamp, países retornados, etc.).

### Módulo 2: Gestión de logs
- Consulta los registros de uso de forma paginada.
- Permite filtrar por **rango de fechas**.
- Permite **editar el nombre de usuario** de un log.
- Permite **eliminar registros individuales**.

---

## 🧱 Arquitectura

- **Componentes modulares y reutilizables**
- **Alta cohesión** y división clara por feature.
- Uso de **NgRx** para el manejo del estado de país y logs.
- Peticiones a GraphQL centralizadas por servicios.
- Estilos organizados por componentes, escritos en SCSS.

---

## 🚀 Despliegue

### 🌐 Producción
- Frontend desplegado en: [https://granadatestfront-production.up.railway.app](https://granadatestfront-production.up.railway.app)
- Se comunica con el backend Laravel GraphQL alojado en Railway.

### 📄 Configuración para despliegue (Railway)

Este proyecto usa `Dockerfile` para construir y servir la app con NGINX.

#### Estructura esperada de producción:

- `Dockerfile` que construye Angular y copia `dist/browser` a NGINX
- `nginx.conf` personalizado para manejar rutas Angular correctamente

```bash
# build local:
docker build -t angular-front .
docker run -p 8080:80 angular-front
