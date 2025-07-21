import { NextResponse } from "next/server"

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "PoliMarket API",
    version: "1.0.0",
    description: "Sistema Integral de Gestión Empresarial - APIs de Componentes de Negocio",
    contact: {
      name: "PoliMarket Team",
      email: "dev@polimarket.com",
    },
  },
  servers: [
    {
      url: "/api",
      description: "Servidor de desarrollo",
    },
  ],
  paths: {
    "/rrhh/autorizar-vendedor": {
      get: {
        tags: ["RRHH"],
        summary: "Obtener lista de vendedores",
        description: "RF1: Consultar todos los vendedores registrados en el sistema",
        responses: {
          200: {
            description: "Lista de vendedores obtenida exitosamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    vendedores: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Vendedor",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["RRHH"],
        summary: "Autorizar/Desautorizar vendedor",
        description: "RF1: Autorización de Vendedores - Permite a RRHH autorizar vendedores para acceso a sistemas",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  idVendedor: { type: "integer", example: 1 },
                  autorizar: { type: "boolean", example: true },
                },
                required: ["idVendedor", "autorizar"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Vendedor autorizado/desautorizado exitosamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    vendedor: { $ref: "#/components/schemas/Vendedor" },
                  },
                },
              },
            },
          },
          404: {
            description: "Vendedor no encontrado",
          },
        },
      },
    },
    "/rrhh/registrar-vendedor": {
      post: {
        tags: ["RRHH"],
        summary: "Registrar nuevo vendedor",
        description: "Registrar un nuevo vendedor en el sistema",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nombre: { type: "string", example: "Juan Pérez" },
                  email: { type: "string", example: "juan@polimarket.com" },
                },
                required: ["nombre", "email"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Vendedor registrado exitosamente",
          },
          400: {
            description: "Email ya registrado",
          },
        },
      },
    },
    "/ventas/generar-venta": {
      get: {
        tags: ["Ventas"],
        summary: "Obtener datos para ventas",
        description: "Obtener clientes, productos y pedidos disponibles",
        responses: {
          200: {
            description: "Datos obtenidos exitosamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    clientes: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Cliente" },
                    },
                    productos: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Producto" },
                    },
                    pedidos: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Pedido" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Ventas"],
        summary: "Generar nueva venta",
        description: "Crear un nuevo pedido de venta con productos seleccionados",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  idVendedor: { type: "integer", example: 1 },
                  idCliente: { type: "integer", example: 1 },
                  productosSeleccionados: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        idProducto: { type: "integer" },
                        cantidad: { type: "integer" },
                      },
                    },
                  },
                },
                required: ["idVendedor", "idCliente", "productosSeleccionados"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Venta generada exitosamente",
          },
          400: {
            description: "Stock insuficiente o datos inválidos",
          },
        },
      },
    },
    "/bodega/verificar-disponibilidad": {
      get: {
        tags: ["Bodega"],
        summary: "Verificar disponibilidad de productos",
        description: "RF2: Verificación de Disponibilidad - Consultar stock de productos en bodega",
        parameters: [
          {
            name: "idProducto",
            in: "query",
            description: "ID del producto específico (opcional)",
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Disponibilidad verificada exitosamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    productos: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Producto" },
                    },
                    producto: { $ref: "#/components/schemas/Producto" },
                  },
                },
              },
            },
          },
          404: {
            description: "Producto no encontrado",
          },
        },
      },
      post: {
        tags: ["Bodega"],
        summary: "Registrar movimiento de inventario",
        description: "Registrar entrada o salida de productos en bodega",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  idProducto: { type: "integer", example: 1 },
                  cantidad: { type: "integer", example: 10 },
                  tipo: { type: "string", enum: ["ENTRADA", "SALIDA"], example: "ENTRADA" },
                },
                required: ["idProducto", "cantidad", "tipo"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Movimiento registrado exitosamente",
          },
          400: {
            description: "Stock insuficiente para salida",
          },
        },
      },
    },
    "/proveedores/solicitar-producto": {
      get: {
        tags: ["Proveedores"],
        summary: "Obtener proveedores y solicitudes",
        description: "Consultar lista de proveedores y solicitudes realizadas",
        responses: {
          200: {
            description: "Datos obtenidos exitosamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    proveedores: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Proveedor" },
                    },
                    solicitudes: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Solicitud" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Proveedores"],
        summary: "Solicitar producto a proveedor",
        description: "RF3: Solicitud de Reposición - Enviar solicitud de productos a proveedores",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  idProveedor: { type: "integer", example: 1 },
                  idProducto: { type: "integer", example: 1 },
                  cantidad: { type: "integer", example: 50 },
                  observaciones: { type: "string", example: "Reposición urgente" },
                },
                required: ["idProveedor", "idProducto", "cantidad"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Solicitud enviada exitosamente",
          },
          404: {
            description: "Proveedor no encontrado",
          },
        },
      },
    },
    "/proveedores/suministrar-productos": {
      get: {
        tags: ["Proveedores"],
        summary: "Obtener suministros recientes",
        description: "RF5: Consultar historial de suministros de productos",
        responses: {
          200: {
            description: "Suministros obtenidos exitosamente",
          },
        },
      },
      post: {
        tags: ["Proveedores"],
        summary: "Suministrar productos",
        description: "RF5: Suministro de Productos - Registrar productos suministrados por proveedores",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  idProveedor: { type: "integer", example: 1 },
                  productos: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        idProducto: { type: "integer" },
                        nombre: { type: "string" },
                        cantidad: { type: "integer" },
                      },
                    },
                  },
                },
                required: ["idProveedor", "productos"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Productos suministrados exitosamente",
          },
          400: {
            description: "Datos de suministro inválidos",
          },
        },
      },
    },
    "/entregas/programar-despacho": {
      get: {
        tags: ["Entregas"],
        summary: "Obtener entregas programadas",
        description: "Consultar lista de entregas programadas",
        responses: {
          200: {
            description: "Entregas obtenidas exitosamente",
          },
        },
      },
      post: {
        tags: ["Entregas"],
        summary: "Programar nueva entrega",
        description: "Programar entrega de un pedido específico",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  idPedido: { type: "integer", example: 1 },
                  fechaProgramada: { type: "string", format: "date", example: "2024-01-25" },
                  direccionEntrega: { type: "string", example: "Av. Principal 123" },
                  observaciones: { type: "string", example: "Entregar en horario de oficina" },
                },
                required: ["idPedido", "fechaProgramada", "direccionEntrega"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Entrega programada exitosamente",
          },
        },
      },
      put: {
        tags: ["Entregas"],
        summary: "Actualizar estado de entrega",
        description: "Actualizar el estado de una entrega existente",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  idEntrega: { type: "integer", example: 1 },
                  estado: { type: "string", example: "ENTREGADO" },
                  fechaEntrega: { type: "string", format: "date", example: "2024-01-25" },
                },
                required: ["idEntrega", "estado"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Estado actualizado exitosamente",
          },
          404: {
            description: "Entrega no encontrada",
          },
        },
      },
    },
    "/entregas/consultar-pedidos": {
      get: {
        tags: ["Entregas"],
        summary: "Consultar pedidos para entrega",
        description: "RF4: Consulta de Pedidos para Entrega - Obtener lista de pedidos procesados",
        parameters: [
          {
            name: "estado",
            in: "query",
            description: "Filtrar por estado del pedido",
            schema: { type: "string", enum: ["PENDIENTE", "PROCESANDO", "LISTO_PARA_ENTREGA"] },
          },
        ],
        responses: {
          200: {
            description: "Pedidos obtenidos exitosamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    pedidos: {
                      type: "array",
                      items: { $ref: "#/components/schemas/PedidoCompleto" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Entregas"],
        summary: "Consultar pedido específico",
        description: "RF4: Obtener información detallada de un pedido específico",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  idPedido: { type: "integer", example: 1 },
                },
                required: ["idPedido"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Pedido encontrado exitosamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    pedido: { $ref: "#/components/schemas/PedidoCompleto" },
                  },
                },
              },
            },
          },
          404: {
            description: "Pedido no encontrado",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Vendedor: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nombre: { type: "string", example: "Ana Rodríguez" },
          email: { type: "string", example: "ana@polimarket.com" },
          estaAutorizado: { type: "boolean", example: true },
          fechaAutorizacion: { type: "string", format: "date-time", example: "2024-01-15T10:30:00Z" },
        },
      },
      Cliente: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nombre: { type: "string", example: "Empresa TechSoft" },
          email: { type: "string", example: "compras@techsoft.com" },
          telefono: { type: "string", example: "555-1001" },
          direccion: { type: "string", example: "Av. Principal 123" },
        },
      },
      Producto: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nombre: { type: "string", example: "Laptop HP Pavilion" },
          precio: { type: "number", format: "float", example: 899.99 },
          stock: { type: "integer", example: 15 },
          stockMinimo: { type: "integer", example: 5 },
        },
      },
      Proveedor: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nombre: { type: "string", example: "Distribuidora Central" },
          contacto: { type: "string", example: "Juan Pérez" },
          telefono: { type: "string", example: "555-0001" },
        },
      },
      Pedido: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          idVendedor: { type: "integer", example: 1 },
          idCliente: { type: "integer", example: 1 },
          fecha: { type: "string", format: "date", example: "2024-01-20" },
          estado: { type: "string", example: "PENDIENTE" },
          total: { type: "number", format: "float", example: 1199.98 },
        },
      },
      PedidoCompleto: {
        allOf: [
          { $ref: "#/components/schemas/Pedido" },
          {
            type: "object",
            properties: {
              productos: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    idProducto: { type: "integer" },
                    nombre: { type: "string" },
                    cantidad: { type: "integer" },
                    precio: { type: "number", format: "float" },
                  },
                },
              },
              cliente: { $ref: "#/components/schemas/Cliente" },
              vendedor: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  nombre: { type: "string" },
                },
              },
            },
          },
        ],
      },
      Solicitud: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          idProveedor: { type: "integer", example: 1 },
          idProducto: { type: "integer", example: 1 },
          cantidad: { type: "integer", example: 50 },
          observaciones: { type: "string", example: "Reposición urgente" },
          fecha: { type: "string", format: "date", example: "2024-01-20" },
          estado: { type: "string", example: "ENVIADA" },
        },
      },
    },
  },
  tags: [
    {
      name: "RRHH",
      description: "RF1: Gestión de Recursos Humanos y autorización de vendedores",
    },
    {
      name: "Ventas",
      description: "RF2: Sistema de ventas con verificación de disponibilidad",
    },
    {
      name: "Bodega",
      description: "RF2: Control de inventario y verificación de disponibilidad",
    },
    {
      name: "Proveedores",
      description: "RF3 y RF5: Gestión de proveedores, solicitudes y suministros",
    },
    {
      name: "Entregas",
      description: "RF4: Gestión de entregas y consulta de pedidos",
    },
  ],
}

export async function GET() {
  return NextResponse.json(swaggerDocument)
}
