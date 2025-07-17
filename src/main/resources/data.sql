-- Precargar datos para Vendedores (RF1)
INSERT INTO vendedores (nombre, autorizado) VALUES ('Juan Perez', true);
INSERT INTO vendedores (nombre, autorizado) VALUES ('Maria Lopez', false);

-- Precargar datos para Proveedores (Soporte para RF3)
INSERT INTO proveedores (nombre, email_contacto) VALUES ('Dog-Chow S.A.S', 'ventas@dogchow.com');
INSERT INTO proveedores (nombre, email_contacto) VALUES ('Juguetes para Mascotas Cia.', 'pedidos@juguetes.co');

-- Precargar datos para Productos (Soporte para RF2, RF3, RF5)
INSERT INTO productos (nombre, descripcion, cantidad_disponible) VALUES ('Concentrado para Perros Adultos 2kg', 'Alimento completo para perros adultos de raza mediana.', 50);
INSERT INTO productos (nombre, descripcion, cantidad_disponible) VALUES ('Pelota de Goma Resistente', 'Juguete para perros con mordida fuerte.', 120);
INSERT INTO productos (nombre, descripcion, cantidad_disponible) VALUES ('Arena para Gatos 5kg', 'Arena aglomerante con control de olores.', 5); -- Stock bajo para probar reposición
INSERT INTO productos (nombre, descripcion, cantidad_disponible) VALUES ('Collar de Cuero Talla M', 'Collar de cuero genuino para perros medianos.', 30);

-- Precargar datos para Ventas (Soporte para RF4)
-- Una venta ya procesada, lista para ser consultada por el sistema de entregas
INSERT INTO ventas (fecha_venta, lista_productos, direccion_entrega, estado) VALUES ('2025-07-16', '1x Concentrado para Perros, 1x Pelota de Goma', 'Calle 100 # 20-30, Bogotá', 'PROCESADA');
-- Una venta ya entregada
INSERT INTO ventas (fecha_venta, lista_productos, direccion_entrega, estado) VALUES ('2025-07-15', '1x Collar de Cuero', 'Carrera 15 # 85-10, Bogotá', 'ENTREGADA');
-- Otra venta lista para entrega
INSERT INTO ventas (fecha_venta, lista_productos, direccion_entrega, estado) VALUES ('2025-07-17', '2x Arena para Gatos 5kg', 'Avenida 68 # 50-40, Bogotá', 'PROCESADA');