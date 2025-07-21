// Configuración para conectar con el backend de Spring Boot
export const API_CONFIG = {
  BASE_URL: "http://localhost:8081",
  ENDPOINTS: {
    // RF1: Autorización de Vendedores
    AUTORIZAR_VENDEDOR: "/api/v1/vendedores", // + /{id}/autorizar

    // RF2: Verificación de Disponibilidad
    VERIFICAR_DISPONIBILIDAD: "/api/v1/productos", // + /{idProducto}/disponibilidad

    // RF3: Solicitud de Reposición
    SOLICITAR_REPOSICION: "/api/v1/reposicion/solicitar",

    // RF4: Consulta de Pedidos para Entrega
    CONSULTAR_PEDIDOS: "/api/v1/entregas/pendientes",

    // RF5: Suministro de Productos
    SUMINISTRAR_PRODUCTOS: "/api/v1/productos", // + /{idProducto}/suministro

    // Added for test-connection/page.tsx compatibility
    VENDEDORES: "/api/v1/vendedores",
    PRODUCTOS: "/api/v1/productos",
    PROVEEDORES: "/api/v1/proveedores",
    PEDIDOS: "/api/v1/pedidos",
    CLIENTES: "/api/v1/clientes",
    ENTREGAS: "/api/v1/entregas",
  },

}

// Función helper para construir URLs completas
export const buildApiUrl = (endpoint: string) => `${API_CONFIG.BASE_URL}${endpoint}`

// Configuración de headers por defecto
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
}