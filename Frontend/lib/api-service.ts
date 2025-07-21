import { API_CONFIG, buildApiUrl, DEFAULT_HEADERS } from "./api-config"
import type { Vendedor } from "@/types/vendedor"

import type { Cliente } from "@/types/cliente"
import type { Producto } from "@/types/producto"
import type { Proveedor } from "@/types/proveedor"
import type { Entrega } from "@/types/entrega"
import type { Pedido } from "@/types/pedido"
class ApiService {
  // Consultar un pedido específico por ID (RF4)
  async getPedidoPorId(idPedido: number): Promise<Pedido> {
    const response = await this.request<{ success: boolean; message: string; pedido: Pedido }>(
      '/api/entregas/consultar-pedidos',
      {
        method: 'POST',
        headers: {
          ...DEFAULT_HEADERS,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idPedido }),
      }
    );
    return response.pedido;
  }
  // Programar una entrega
  async programarEntrega(entrega: {
    idPedido: number;
    fechaProgramada: string;
    direccionEntrega: string;
    observaciones?: string;
  }) {
    return this.request(`${API_CONFIG.ENDPOINTS.ENTREGAS}/programar`, {
      method: 'POST',
      body: JSON.stringify(entrega),
    });
  }
  // Registrar movimiento de inventario (entrada/salida)
  async registrarMovimientoInventario(movimiento: { idProducto: number; cantidad: number; tipo: "ENTRADA" | "SALIDA" }) {
    return this.request('/api/v1/inventario/movimiento', {
      method: 'POST',
      body: JSON.stringify(movimiento),
    });
  }
  // Registrar un nuevo vendedor
  async registrarVendedor(vendedor: { nombre: string; email: string }) {
    return this.request(API_CONFIG.ENDPOINTS.VENDEDORES + '/registrar', {
      method: 'POST',
      body: JSON.stringify(vendedor),
    })
  }
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = buildApiUrl(endpoint)

    const config: RequestInit = {
      headers: DEFAULT_HEADERS,
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error)
      throw error
    }
  }

  // RF1: Autorización de Vendedores
  async autorizarVendedor(idVendedor: number, autorizar: boolean) {
    return this.request(`${API_CONFIG.ENDPOINTS.AUTORIZAR_VENDEDOR}/${idVendedor}/autorizar`, {
      method: "PUT",
      body: JSON.stringify({ autorizar }),
    })
  }

  // RF2: Verificación de Disponibilidad
  async verificarDisponibilidad(idProducto: number) {
    return this.request(`${API_CONFIG.ENDPOINTS.VERIFICAR_DISPONIBILIDAD}/${idProducto}/disponibilidad`)
  }

  // RF3: Solicitud de Reposición
  async solicitarReposicion(solicitud: {
    idProveedor: number
    idProducto: number
    cantidad: number
    observaciones?: string
  }) {
    return this.request(API_CONFIG.ENDPOINTS.SOLICITAR_REPOSICION, {
      method: "POST",
      body: JSON.stringify(solicitud),
    })
  }

  // RF4: Consulta de Pedidos para Entrega
  async getPedidosPendientes() {
    return this.request(API_CONFIG.ENDPOINTS.CONSULTAR_PEDIDOS)
  }

  // Obtener lista de Vendedores
  async getVendedores(): Promise<Vendedor[]> {
    const data = await this.request<any[]>(API_CONFIG.ENDPOINTS.VENDEDORES)
    // Mapear campos del backend (autorizado) al frontend (estaAutorizado)
    return data.map((v) => ({
      ...v,
      estaAutorizado: v.autorizado,
    }))
  }

  // Obtener lista de Clientes
  async getClientes(): Promise<Cliente[]> {
    return this.request<Cliente[]>(API_CONFIG.ENDPOINTS.CLIENTES)
  }

  // Obtener lista de Productos
  async getProductos(): Promise<Producto[]> {
    return this.request<Producto[]>(API_CONFIG.ENDPOINTS.PRODUCTOS)
  }

  // Obtener lista de Proveedores
  async getProveedores(): Promise<Proveedor[]> {
    return this.request<Proveedor[]>(API_CONFIG.ENDPOINTS.PROVEEDORES)
  }

  // Obtener lista de Entregas
  async getEntregas(): Promise<Entrega[]> {
    return this.request<Entrega[]>(API_CONFIG.ENDPOINTS.ENTREGAS)
  }

  // RF5: Suministro de Productos
  async suministrarProductos(idProducto: number, suministro: {
    cantidad: number
    proveedor: string
  }) {
    return this.request(`${API_CONFIG.ENDPOINTS.SUMINISTRAR_PRODUCTOS}/${idProducto}/suministro`, {
      method: "POST",
      body: JSON.stringify(suministro),
    })
  }
}

export const apiService = new ApiService()