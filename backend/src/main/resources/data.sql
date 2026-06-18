-- Datos de ejemplo para PET CENTER

-- Insertar categorías de productos
INSERT INTO product_categories (nombre, descripcion, fecha_creacion) VALUES
('Alimentos', 'Comidas y bebidas para mascotas', CURRENT_TIMESTAMP),
('Accesorios', 'Collares, correas y otros accesorios', CURRENT_TIMESTAMP),
('Juguetes', 'Juguetes para perros y gatos', CURRENT_TIMESTAMP),
('Medicinas', 'Medicinas y vitaminas para mascotas', CURRENT_TIMESTAMP),
('Higiene', 'Productos de higiene y cuidado personal', CURRENT_TIMESTAMP);

-- Insertar productos
INSERT INTO products (nombre, descripcion, precio, stock, fecha_creacion, ultima_actualizacion, categoria_id) VALUES
('Alimento Premium para Perros', 'Alimento balanceado 20kg', 85.50, 50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1),
('Alimento Premium para Gatos', 'Alimento balanceado 10kg', 65.00, 40, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1),
('Collar Ajustable', 'Collar ajustable con placa', 15.00, 100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2),
('Correa de Paseo', 'Correa resistente 2 metros', 25.00, 80, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2),
('Pelota de Goma', 'Juguete resistente para perros', 12.00, 150, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3),
('Ratón de Peluche', 'Juguete para gatos', 8.00, 200, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3),
('Vitaminas Multivitamínicas', 'Vitaminas para perros adultos', 45.00, 30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 4),
('Champú Antipulgas', 'Champú para perros 500ml', 35.00, 60, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 5),
('Cepillo para Mascotas', 'Cepillo profesional', 22.00, 75, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 5);

-- Insertar usuarios de ejemplo
INSERT INTO users (nombre, apellido, email, telefono, password, role, activo, fecha_registro, ultima_actualizacion) VALUES
('Admin', 'Sistema', 'admin@petcenter.com', '555-0001', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/1Cm', 'ADMIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Juan', 'Pérez', 'juan@example.com', '555-0002', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/1Cm', 'CLIENTE', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('María', 'García', 'maria@example.com', '555-0003', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/1Cm', 'CLIENTE', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Dr. Carlos', 'López', 'carlos@petcenter.com', '555-0004', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/1Cm', 'VETERINARIO', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Ana', 'Rodríguez', 'ana@petcenter.com', '555-0005', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36P4/1Cm', 'RECEPCIONISTA', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insertar mascotas
INSERT INTO pets (nombre, especie, raza, fecha_nacimiento, peso, color, notas, fecha_registro, ultima_actualizacion, propietario_id) VALUES
('Max', 'Perro', 'Labrador', '2021-03-15', 32.5, 'Negro', 'Muy activo y juguetón', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2),
('Luna', 'Gato', 'Persa', '2020-06-20', 4.2, 'Blanco', 'Tranquilo y cariñoso', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2),
('Bella', 'Perro', 'Beagle', '2022-01-10', 15.8, 'Marrón y blanco', 'Excelente con niños', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3);

-- Insertar citas de ejemplo
INSERT INTO appointments (fecha_hora, razon, diagnostico, tratamiento, estado, fecha_creacion, ultima_actualizacion, usuario_id, mascota_id, veterinario_id) VALUES
(DATEADD('DAY', 7, CURRENT_TIMESTAMP), 'Revisión general', NULL, NULL, 'PROGRAMADA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1, NULL),
(DATEADD('DAY', 5, CURRENT_TIMESTAMP), 'Vacunación', NULL, NULL, 'PROGRAMADA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3, 3, 4);

-- Insertar compras de ejemplo
INSERT INTO purchases (numero_comprobante, total, fecha_compra, confirmada, usuario_id) VALUES
('PC-1704067200000', 125.50, CURRENT_TIMESTAMP, true, 2);

-- Insertar items de compra
INSERT INTO purchase_items (cantidad, precio_unitario, subtotal, compra_id, producto_id) VALUES
(1, 85.50, 85.50, 1, 1),
(1, 40.00, 40.00, 1, 7);

-- Nota: Las contraseñas de los usuarios de ejemplo son: "password"
-- Hash generado con BCrypt
