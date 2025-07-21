export interface Entrega {
  id: number;
  idPedido: number;
  fecha: string;
  estado: string;
  direccionEntrega?: string;
  observaciones?: string;
}
