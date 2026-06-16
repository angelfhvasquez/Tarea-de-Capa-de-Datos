# PET CENTER - API Reference

## Base URL
```
http://localhost:8080/api
```

## Autenticación
Todos los endpoints excepto registro y login requieren el header:
```
Authorization: Bearer <token>
```

---

## 🔐 Autenticación

### Registro
```http
POST /auth/register
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "telefono": "555-1234",
  "password": "SecurePass123"
}

Response (201):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tipo": "Bearer",
  "id": 1,
  "email": "juan@example.com",
  "nombre": "Juan",
  "apellido": "Pérez",
  "rol": "CLIENTE"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "SecurePass123"
}

Response (200):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tipo": "Bearer",
  "id": 1,
  "email": "juan@example.com",
  "nombre": "Juan",
  "apellido": "Pérez",
  "rol": "CLIENTE"
}
```

---

## 👥 Usuarios

### Obtener Usuario
```http
GET /users/{id}
Authorization: Bearer <token>

Response (200):
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "telefono": "555-1234",
  "role": "CLIENTE",
  "activo": true,
  "fechaRegistro": "2024-01-15T10:30:00",
  "ultimaActualizacion": "2024-01-15T10:30:00"
}
```

### Listar Usuarios (Admin)
```http
GET /users
Authorization: Bearer <admin_token>

Response (200):
[
  {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    ...
  },
  ...
]
```

### Actualizar Usuario
```http
PUT /users/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "telefono": "555-5678",
  "password": "NewPassword123"
}

Response (200): Usuario actualizado
```

---

## 🐾 Mascotas

### Crear Mascota
```http
POST /pets
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Max",
  "especie": "Perro",
  "raza": "Labrador",
  "fechaNacimiento": "2021-03-15",
  "peso": 32.5,
  "color": "Negro",
  "notas": "Muy activo",
  "propietarioId": 1
}

Response (201):
{
  "id": 1,
  "nombre": "Max",
  "especie": "Perro",
  "raza": "Labrador",
  "fechaNacimiento": "2021-03-15",
  "peso": 32.5,
  "color": "Negro",
  "propietarioNombre": "Juan Pérez",
  "fechaRegistro": "2024-01-15T11:00:00",
  "ultimaActualizacion": "2024-01-15T11:00:00"
}
```

### Listar Mascotas del Propietario
```http
GET /pets/propietario/{propietarioId}
Authorization: Bearer <token>

Response (200):
[
  {
    "id": 1,
    "nombre": "Max",
    ...
  }
]
```

### Obtener Mascota
```http
GET /pets/{id}
Authorization: Bearer <token>

Response (200): Objeto Mascota
```

### Actualizar Mascota
```http
PUT /pets/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Max",
  "peso": 33.5,
  ...
}

Response (200): Mascota actualizada
```

### Eliminar Mascota
```http
DELETE /pets/{id}
Authorization: Bearer <token>

Response (204): Sin contenido
```

---

## 📅 Citas Veterinarias

### Crear Cita
```http
POST /appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "fechaHora": "2024-01-25T14:30:00",
  "razon": "Revisión general",
  "mascotaId": 1,
  "usuarioId": 1
}

Response (201):
{
  "id": 1,
  "fechaHora": "2024-01-25T14:30:00",
  "razon": "Revisión general",
  "estado": "PROGRAMADA",
  "mascotaNombre": "Max",
  "usuarioNombre": "Juan Pérez",
  ...
}
```

### Listar Citas del Usuario
```http
GET /appointments/usuario/{usuarioId}
Authorization: Bearer <token>

Response (200): Array de citas
```

### Confirmar Cita
```http
PUT /appointments/{id}/confirm
Authorization: Bearer <token>

Response (200): Cita confirmada
```

### Reprogramar Cita
```http
PUT /appointments/{id}/reschedule?newDateTime=2024-01-26T15:00:00
Authorization: Bearer <token>

Response (200): Cita reprogramada
```

### Cancelar Cita
```http
PUT /appointments/{id}/cancel
Authorization: Bearer <token>

Response (200): Cita cancelada
```

---

## 🛍️ Productos

### Obtener Todas las Categorías
```http
GET /products/categories
Authorization: Bearer <token> (opcional)

Response (200):
[
  {
    "id": 1,
    "nombre": "Alimentos",
    "descripcion": "Comidas y bebidas para mascotas",
    "fechaCreacion": "2024-01-01T10:00:00"
  },
  ...
]
```

### Crear Producto (Admin)
```http
POST /products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "nombre": "Alimento Premium",
  "descripcion": "Alimento balanceado 20kg",
  "precio": 85.50,
  "stock": 50,
  "categoriaId": 1
}

Response (201): Producto creado
```

### Listar Productos Disponibles
```http
GET /products/available
Authorization: Bearer <token> (opcional)

Response (200):
[
  {
    "id": 1,
    "nombre": "Alimento Premium",
    "descripcion": "Alimento balanceado 20kg",
    "precio": 85.50,
    "stock": 50,
    "categoriaNombre": "Alimentos",
    ...
  },
  ...
]
```

### Obtener Producto
```http
GET /products/{id}
Authorization: Bearer <token> (opcional)

Response (200): Objeto Producto
```

### Actualizar Producto (Admin)
```http
PUT /products/{id}
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "nombre": "Alimento Premium Plus",
  "precio": 90.00,
  "stock": 45
}

Response (200): Producto actualizado
```

### Eliminar Producto (Admin)
```http
DELETE /products/{id}
Authorization: Bearer <admin_token>

Response (204): Sin contenido
```

---

## 🛒 Compras

### Crear Compra
```http
POST /purchases?usuarioId={usuarioId}
Authorization: Bearer <token>
Content-Type: application/json

[
  {
    "productoId": 1,
    "cantidad": 2,
    "precioUnitario": 85.50,
    "subtotal": 171.00
  },
  {
    "productoId": 3,
    "cantidad": 1,
    "precioUnitario": 15.00,
    "subtotal": 15.00
  }
]

Response (201):
{
  "id": 1,
  "numeroComprobante": "PC-1704067200000",
  "total": 186.00,
  "fechaCompra": "2024-01-15T12:00:00",
  "confirmada": false,
  "usuarioNombre": "Juan Pérez",
  "items": [...]
}
```

### Confirmar Compra
```http
PUT /purchases/{id}/confirm
Authorization: Bearer <token>

Response (200): Compra confirmada
```

### Obtener Compra
```http
GET /purchases/{id}
Authorization: Bearer <token>

Response (200): Objeto Compra
```

### Listar Compras del Usuario
```http
GET /purchases/usuario/{usuarioId}
Authorization: Bearer <token>

Response (200): Array de compras
```

### Listar Compras Confirmadas
```http
GET /purchases/confirmed
Authorization: Bearer <admin_token>

Response (200): Array de compras confirmadas
```

---

## 📊 Dashboard

### Obtener Estadísticas
```http
GET /dashboard/stats
Authorization: Bearer <token>

Response (200):
{
  "totalCitas": 15,
  "citasConfirmadas": 10,
  "citasPendientes": 5,
  "totalVentas": 25,
  "totalProductos": 9,
  "productosDisponibles": 8,
  "ventasTotales": 2500.50,
  "ventasDelMes": 850.25
}
```

---

## ❌ Códigos de Error

| Código | Descripción |
|--------|------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 204 | No Content - Solicitud exitosa sin contenido |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token inválido o no proporcionado |
| 403 | Forbidden - Acceso denegado |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## 📝 Formato de Respuesta de Error

```json
{
  "timestamp": "2024-01-15T12:30:45.123456",
  "status": 400,
  "error": "Solicitud Inválida",
  "message": "El email ya está registrado"
}
```

---

Para más información, consultar README_PET_CENTER.md
