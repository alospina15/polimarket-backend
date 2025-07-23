-- Datos de prueba para el sistema

-- Insertar proveedores
INSERT INTO proveedores (nombre, contacto, telefono, email) VALUES
('Distribuidora Central', 'Juan Pérez', '555-0001', 'juan@distcentral.com'),
('Mayorista del Norte', 'María García', '555-0002', 'maria@maynorte.com'),
('Importadora Global', 'Carlos López', '555-0003', 'carlos@impglobal.com');

-- Insertar productos
INSERT INTO productos (nombre, descripcion, precio, stock_actual, stock_minimo, id_proveedor) VALUES
('Laptop HP Pavilion', 'Laptop para oficina 8GB RAM', 899.99, 15, 5, 1),
('Mouse Inalámbrico', 'Mouse ergonómico inalámbrico', 25.99, 50, 10, 2),
('Teclado Mecánico', 'Teclado mecánico RGB', 79.99, 30, 8, 2),
('Monitor 24"', 'Monitor Full HD 24 pulgadas', 199.99, 20, 5, 1),
('Impresora Multifuncional', 'Impresora láser multifuncional', 299.99, 8, 3, 3);

-- Insertar vendedores
INSERT INTO vendedores (nombre, email, esta_autorizado, fecha_autorizacion) VALUES
('Ana Rodríguez', 'ana@polimarket.com', true, CURRENT_TIMESTAMP),
('Pedro Martínez', 'pedro@polimarket.com', true, CURRENT_TIMESTAMP),
('Laura Sánchez', 'laura@polimarket.com', false, NULL);

-- Insertar clientes
INSERT INTO clientes (nombre, email, telefono, direccion) VALUES
('Empresa TechSoft', 'compras@techsoft.com', '555-1001', 'Av. Principal 123'),
('Oficinas ModernCorp', 'admin@moderncorp.com', '555-1002', 'Calle Comercial 456'),
('StartUp Innovate', 'contacto@innovate.com', '555-1003', 'Plaza Central 789');

-- Insertar algunos pedidos de ejemplo
INSERT INTO pedidos (id_vendedor, id_cliente, fecha, estado, total) VALUES
(1, 1, CURRENT_DATE, 'PENDIENTE', 1199.98),
(2, 2, CURRENT_DATE - INTERVAL '1 day', 'PROCESANDO', 599.97);

-- Insertar detalles de pedidos
INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 1, 899.99, 899.99),
(1, 4, 1, 199.99, 199.99),
(1, 2, 2, 25.99, 51.98),
(2, 3, 2, 79.99, 159.98),
(2, 5, 1, 299.99, 299.99);
