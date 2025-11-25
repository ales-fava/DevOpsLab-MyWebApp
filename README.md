# 💻 Aplicación Web DevOps (Angular)

Esta es una Single Page Application (SPA) desarrollada en Angular con arquitectura de Componentes Standalone. La aplicación sirve como el componente frontend de un ecosistema DevOps completo, siendo desplegada en Kubernetes a través de GitOps. La característica principal de esta aplicación es su capacidad de cargar la configuración dinámica para Feature Flags a través de archivos estáticos inyectados en tiempo de ejecución por Kubernetes (ConfigMaps), desacoplando el deployment del release.

## ⚡ Quick Start (Ejecución Local)

Para ejecutar el proyecto en tu máquina local para desarrollo o pruebas:

### Prerrequisitos

- Node.js (v20+)
- npm
- Angular CLI (`npm install -g @angular/cli`)

### Pasos

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/TU_USUARIO/devops-lab-app.git
    cd devops-lab-app
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Ejecutar servidor de desarrollo:**

    ```bash
    ng serve
    ```

    Navega a [http://localhost:4200/](http://localhost:4200/). La aplicación recargará automáticamente si cambias algún archivo fuente.

4.  **Ejecutar con Docker (Simulación de Prod):**

    ```bash
    docker build -t my-angular-app .
    docker run -p 8080:80 my-angular-app
    ```

## 📂 Estructura del Proyecto

A continuación se detallan los archivos y directorios clave del proyecto:

| Archivo/Directorio       | Descripción                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/`     | Definición del Pipeline de Integración Continua (CI).                                                                  |
| `src/app/`               | Lógica de componentes (App y Componentes Standalone).                                                                  |
| `src/assets/config.json` | Punto de Inyección: Archivo base de configuración para Feature Flags (es sobrescrito por Kubernetes en el despliegue). |
| `angular.json`           | Configuración del CLI, asegura que `config.json` se copia al `dist/assets` durante la compilación.                     |
| `Dockerfile`             | Definición de la construcción Multi-Stage (Node Build -> Nginx Run).                                                   |
| `nginx.conf`             | Configuración del servidor web Nginx para manejar el ruteo de la SPA.                                                  |

## 🛠️ Tecnologías

Este proyecto utiliza un stack de tecnologías frontend y de contenedores moderno:

- **Framework**: Angular (v20+) con arquitectura de Standalone Components.
- **Lenguaje**: TypeScript.
- **Feature Flags**: Implementado mediante inyección de ConfigMap de Kubernetes sobre el archivo `/assets/config.json`, leído por `HttpClient`.
- **Servidor Web**: Nginx (Alpine Linux) para servir los estáticos de forma ligera y eficiente.
- **Containerización**: Docker (Multi-stage builds para reducir el tamaño de la imagen final).
- **Calidad de Código**: SonarCloud (Análisis estático SAST).
- **Seguridad de Imagen**: Trivy (Escaneo de vulnerabilidades en la imagen Docker).

## 🚀 CI/CD con GitHub Actions

La fase de Integración Continua (CI) se automatiza mediante GitHub Actions al realizar un push a la rama `main`.

### Flujo del Pipeline:

1.  **Build & Test**:

    - Compilación de producción (`ng build`).

2.  **Análisis de Seguridad y Calidad**:

    - SonarCloud: Ejecución del análisis de calidad de código y reporte de métricas.
    - Trivy FS: Escaneo del sistema de archivos buscando vulnerabilidades.

3.  **Docker Push**:

    - Construcción de la imagen Docker.
    - Escaneo de seguridad de la imagen final con Trivy.
    - Publicación de la imagen en GitHub Container Registry (GHCR), etiquetada con el hash del commit.

4.  **CD Trigger**:
    - El pipeline actualiza automáticamente el `image.tag` en el `values.yaml` del repositorio de Infraestructura.
    - Esto fuerza a ArgoCD a sincronizar el clúster con la nueva versión de la aplicación.

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Para proponer cambios y asegurar que la integración continua funcione correctamente:

1.  Haz un Fork del repositorio.
2.  Crea una rama descriptiva para tu funcionalidad o corrección (`git checkout -b feature/nombre-funcionalidad`).
3.  Realiza tus cambios y haz commit (`git commit -m 'feat: Descripción clara del cambio'`).
4.  Asegúrate de que los cambios de configuración en `angular.json` son correctos si añades nuevos assets.
5.  Abre un Pull Request hacia la rama `main`.

> **Nota**: La aplicación no debe contener ninguna clave de infraestructura o credencial de seguridad.
