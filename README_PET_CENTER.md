# PET CENTER - Solución Full Stack

Una aplicación web completa para la gestión de un centro veterinario y tienda de mascotas.

## 🏗️ Arquitectura

### Backend - Spring Boot 3
- **Framework**: Spring Boot 3.2.0
- **Base de Datos**: MySQL
- **Autenticación**: JWT (JSON Web Tokens)
- **ORM**: Spring Data JPA
- **Seguridad**: Spring Security

### Frontend - React 18
- **Framework UI**: Material-UI (MUI)
- **Animaciones**: Framer Motion
- **Gráficos**: Recharts
- **Enrutamiento**: React Router v6
- **Cliente HTTP**: Axios

## 📦 Características

### Módulo de Usuarios
- ✅ Registro de usuarios
- ✅ Login con JWT
- ✅ Gestión de roles (Cliente, Recepcionista, Veterinario, Admin)
- ✅ Perfil de usuario

### Módulo de Mascotas
- ✅ Registrar mascota
- ✅ Editar información de mascota
- ✅ Listar mascotas por propietario
- ✅ Eliminar mascotas

### Módulo de Citas Veterinarias
- ✅ Crear cita
- ✅ Consultar horarios disponibles
- ✅ Reprogramar cita
- ✅ Cancelar cita
- ✅ Confirmar cita
- ✅ Asignar veterinario

### Módulo de Productos
- ✅ CRUD completo de productos
- ✅ Gestión de categorías
- ✅ Control de stock
- ✅ Listar productos disponibles

### Módulo de Compras
- ✅ Carrito de compras
- ✅ Confirmación de compra
- ✅ Generación de comprobantes
- ✅ Historial de compras

### Dashboard
- ✅ Total de citas
- ✅ Total de ventas
- ✅ Productos disponibles
- ✅ Gráficos estadísticos
- ✅ Métricas mensuales

## 🚀 Instalación

### Requisitos Previos
- Java 17+
- Maven 3.6+
- Node.js 16+
- MySQL 8.0+

### Backend - Configuración

1. **Navegar al directorio del backend**
   ```bash
   cd backend
   ```

2. **Crear la base de datos MySQL**
   ```sql
   CREATE DATABASE petcenter_db;
   ```

3. **Configurar `application.properties`**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/petcenter_db
   spring.datasource.username=root
   spring.datasource.password=root
   ```

4. **Compilar el proyecto**
   ```bash
   mvn clean install
   ```

5. **Ejecutar la aplicación**
   ```bash
   mvn spring-boot:run
   ```

   El backend estará disponible en `http://localhost:8080`

### Frontend - Configuración

1. **Navegar al directorio raíz**
   ```bash
   cd ..
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación**
   ```bash
   npm start
   ```

   El frontend estará disponible en `http://localhost:3000`

## 📚 Estructura del Proyecto

### Backend
```
backend/
├── src/main/java/com/petcenter/
│   ├── PetCenterApplication.java
│   ├── controller/          # REST Controllers
│   ├── service/             # Lógica de negocio
│   ├── repository/          # Data Access Layer
│   ├── entity/              # JPA Entities
│   ├── dto/                 # Data Transfer Objects
│   ├── security/            # JWT y seguridad
│   ├── config/              # Configuraciones
│   └── exception/           # Manejo de excepciones
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

### Frontend
```
src/
├── components/
│   ├── Auth/                # Login, Register
│   ├── Pets/                # Gestión de mascotas
│   ├── Appointments/        # Citas veterinarias
│   ├── Products/            # Tienda de productos
│   ├── Cart/                # Carrito de compras
│   ├── Dashboard/           # Panel de estadísticas
│   └── Layout/              # Navbar, PrivateRoute
├── services/                # Servicios Axios
├── context/                 # AuthContext
├── pages/                   # Páginas principales
├── utils/                   # Utilidades
├── App.jsx
└── index.jsx
```

## 🔐 API REST Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Usuarios
- `GET /api/users/{id}` - Obtener usuario
- `GET /api/users` - Listar todos los usuarios (Admin)
- `PUT /api/users/{id}` - Actualizar usuario
- `DELETE /api/users/{id}` - Eliminar usuario (Admin)

### Mascotas
- `POST /api/pets` - Crear mascota
- `GET /api/pets/{id}` - Obtener mascota
- `GET /api/pets` - Listar todas las mascotas
- `GET /api/pets/propietario/{propietarioId}` - Mascotas de un propietario
- `PUT /api/pets/{id}` - Actualizar mascota
- `DELETE /api/pets/{id}` - Eliminar mascota

### Citas
- `POST /api/appointments` - Crear cita
- `GET /api/appointments/{id}` - Obtener cita
- `GET /api/appointments` - Listar citas
- `GET /api/appointments/usuario/{usuarioId}` - Citas de usuario
- `GET /api/appointments/veterinario/{veterinarioId}` - Citas de veterinario
- `PUT /api/appointments/{id}/confirm` - Confirmar cita
- `PUT /api/appointments/{id}/reschedule` - Reprogramar cita
- `PUT /api/appointments/{id}/cancel` - Cancelar cita

### Productos
- `POST /api/products` - Crear producto (Admin)
- `GET /api/products` - Listar productos
- `GET /api/products/{id}` - Obtener producto
- `GET /api/products/available` - Productos disponibles
- `GET /api/products/category/{categoriaId}` - Por categoría
- `PUT /api/products/{id}` - Actualizar producto (Admin)
- `DELETE /api/products/{id}` - Eliminar producto (Admin)

### Categorías
- `POST /api/products/categories` - Crear categoría (Admin)
- `GET /api/products/categories` - Listar categorías
- `PUT /api/products/categories/{id}` - Actualizar categoría (Admin)
- `DELETE /api/products/categories/{id}` - Eliminar categoría (Admin)

### Compras
- `POST /api/purchases` - Crear compra
- `PUT /api/purchases/{id}/confirm` - Confirmar compra
- `GET /api/purchases/{id}` - Obtener compra
- `GET /api/purchases/usuario/{usuarioId}` - Compras de usuario
- `GET /api/purchases` - Listar compras
- `GET /api/purchases/confirmed` - Compras confirmadas

### Dashboard
- `GET /api/dashboard/stats` - Obtener estadísticas

## 🔑 Credenciales de Prueba

### Usuarios Predefinidos
Puedes crear usuarios en el proceso de registro, con roles:
- `CLIENTE` - Cliente regular
- `RECEPCIONISTA` - Personal de recepción
- `VETERINARIO` - Doctor veterinario
- `ADMIN` - Administrador del sistema

## 🛠️ Tecnologías Usadas

### Backend
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- MySQL Connector
- JWT (JJWT)
- ModelMapper
- Lombok

### Frontend
- React 18.2.0
- Material-UI 5.14.0
- Framer Motion 10.16.0
- Recharts 2.10.0
- Axios 1.5.0
- React Router 6.18.0
- Date-fns 2.30.0

## 📱 Características de UX/UI

- ✨ Interfaz moderna con Material Design
- 🎨 Tema personalizado con colores profesionales
- ⚡ Animaciones suaves con Framer Motion
- 📊 Gráficos interactivos con Recharts
- 📱 Diseño responsivo para todos los dispositivos
- 🔐 Autenticación segura con JWT
- 🎯 Navegación intuitiva

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Fork el repositorio
2. Crear una rama para tu feature
3. Commit los cambios
4. Push a la rama
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

## ✅ Checklist de Implementación

- [x] Backend Spring Boot completamente configurado
- [x] Autenticación JWT implementada
- [x] Todas las entidades JPA creadas
- [x] Servicios de negocio implementados
- [x] Controllers REST implementados
- [x] Frontend React estructurado
- [x] Componentes de autenticación
- [x] Componentes CRUD para mascotas
- [x] Componentes de citas veterinarias
- [x] Componentes de productos y carrito
- [x] Dashboard con gráficos
- [x] Integración Axios con backend
- [x] Validaciones de formularios
- [x] Manejo de errores
- [x] Context API para autenticación
- [x] Rutas privadas implementadas

## 🎯 Próximos Pasos

1. Descargar/Clonar el repositorio
2. Configurar MySQL
3. Ejecutar backend
4. Instalar dependencias frontend
5. Ejecutar frontend
6. Acceder a `http://localhost:3000`
7. Registrarse como nuevo usuario
8. ¡Disfrutar usando PET CENTER!

---

**PET CENTER** - Solución completa para centros veterinarios. Desarrollado con ❤️
