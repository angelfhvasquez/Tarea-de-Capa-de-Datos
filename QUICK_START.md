# PET CENTER - Guía de Instalación Rápida

## ⚡ Instalación con Docker (Recomendado)

### Requisitos
- Docker
- Docker Compose

### Pasos

1. **Navegar al directorio raíz del proyecto**
   ```bash
   cd /path/to/petcenter
   ```

2. **Compilar el backend**
   ```bash
   cd backend
   mvn clean package
   cd ..
   ```

3. **Construir y ejecutar con Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Acceder a la aplicación**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Base de datos MySQL: localhost:3306

### Credenciales de Ejemplo
- Email: `juan@example.com`
- Contraseña: `password`

---

## 📋 Instalación Manual

### Backend

1. **Crear base de datos**
   ```bash
   mysql -u root -p -e "CREATE DATABASE petcenter_db;"
   ```

2. **Compilar**
   ```bash
   cd backend
   mvn clean install
   ```

3. **Ejecutar**
   ```bash
   mvn spring-boot:run
   ```

### Frontend

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**
   ```bash
   npm start
   ```

3. **Construir para producción**
   ```bash
   npm run build
   ```

---

## 🐛 Solución de Problemas

### Error: "Connection refused" en MySQL
- Verificar que MySQL está ejecutándose
- Verificar configuración en `application.properties`

### Error: "Port 3000 already in use"
```bash
# En Linux/Mac
lsof -ti:3000 | xargs kill -9

# En Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Error: "No bean named 'userDetailsService'"
- Verificar que SecurityConfig está correctamente anotado
- Limpiar y recompilar: `mvn clean install`

---

## 🔍 Verificación de Instalación

### Backend
```bash
curl http://localhost:8080/api/products/categories
```

### Frontend
Acceder a http://localhost:3000 y verificar que carga correctamente

---

## 📝 Notas Importantes

1. Por defecto, la aplicación crea las tablas automáticamente (ddl-auto=update)
2. Los datos de ejemplo en `data.sql` se pueden insertar manualmente si es necesario
3. JWT expira en 24 horas (configurable en `application.properties`)
4. CORS está configurado para aceptar todas las fuentes (cambiar en producción)

---

Para más información, consultar el README_PET_CENTER.md
