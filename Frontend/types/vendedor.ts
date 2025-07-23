export interface Vendedor {
  id: number;
  nombre: string;
  email: string;
  estaAutorizado: boolean;
  fechaAutorizacion?: string;
}
