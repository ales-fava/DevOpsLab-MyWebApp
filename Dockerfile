# --- ETAPA 1: Construcción (Build) ---
# Usamos una imagen de Node para compilar Angular
FROM node:20-alpine as build-stage

WORKDIR /app

# Copiamos primero los package.json para aprovechar la caché de Docker
COPY package*.json ./
RUN npm ci

# Copiamos el código fuente
COPY . .

# Compilamos la aplicación para producción
# (Si no tienes código real, esto fallará, asegúrate de tener una app angular básica)
RUN npm run build

# --- ETAPA 2: Producción (Run) ---
# Usamos Nginx Alpine que es muy ligero y seguro
FROM nginx:alpine as production-stage

# Copiamos la configuración personalizada de Nginx (Paso 4)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos compilados desde la Etapa 1
COPY --from=build-stage /app/dist/MyWebApp/browser /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]