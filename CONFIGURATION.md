# PET CENTER - Configuración por Ambiente

## Desarrollo

```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/petcenter_db
spring.datasource.username=root
spring.datasource.password=root

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
app.jwtSecret=PetCenterSecretKeyForDevelopment
app.jwtExpirationInMs=86400000

# Logging
logging.level.root=INFO
logging.level.com.petcenter=DEBUG
```

## Producción

```properties
# Server
server.port=8080
server.ssl.key-store=keystore.p12
server.ssl.key-store-password=password
server.ssl.key-store-type=PKCS12

# Database
spring.datasource.url=jdbc:mysql://db-server:3306/petcenter_db
spring.datasource.username=petcenter_user
spring.datasource.password=${DB_PASSWORD}

# JPA
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# JWT
app.jwtSecret=${JWT_SECRET}
app.jwtExpirationInMs=86400000

# Logging
logging.level.root=WARN
logging.level.com.petcenter=INFO
```

## Variables de Entorno Recomendadas

```bash
# Base de datos
DB_PASSWORD=your_secure_password
DB_HOST=your_database_host
DB_PORT=3306
DB_NAME=petcenter_db

# JWT
JWT_SECRET=your_very_long_and_secure_jwt_secret_key_for_production

# CORS
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Ambiente
APP_ENV=production
```

## Cambios Necesarios para Producción

1. **Seguridad**
   - Cambiar `app.jwtSecret` a una clave más segura
   - Configurar CORS específicamente (no usar `*`)
   - Habilitar HTTPS
   - Usar variables de entorno para datos sensibles

2. **Base de datos**
   - Usar contraseña fuerte
   - Cambiar `ddl-auto` a `validate`
   - Usar backups automáticos
   - Considerar réplicas para alta disponibilidad

3. **Logging**
   - Cambiar nivel de log a WARN o ERROR
   - Implementar logging centralizado
   - Monitorear errores en tiempo real

4. **Performance**
   - Configurar connection pooling
   - Habilitar caché
   - Usar CDN para assets estáticos
   - Implementar rate limiting

5. **Frontend**
   - Construir para producción: `npm run build`
   - Configurar variables de entorno
   - Usar HTTPS
   - Implementar Service Workers

---

Para más información sobre configuración, ver documentation/
