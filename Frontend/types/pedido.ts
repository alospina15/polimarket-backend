export interface Pedido {
  id: number
  idVendedor: number
  idCliente: number
  fecha: string
  estado: string
  total: number
  productos: any[]
  cliente: {
    id: number
    nombre: string
    email: string
    telefono: string
    direccion: string
  }
  vendedor: { id: number; nombre: string }
}
