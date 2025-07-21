import { type NextRequest, NextResponse } from "next/server"

// RF4: Consulta de Pedidos para Entrega
const pedidosParaEntrega = [
  {
    id: 1,
    idVendedor: 1,
    idCliente: 1,
    fecha: "2024-01-20",
    estado: "PROCESANDO",
    total: 1199.98,
    productos: [
      { idProducto: 1, nombre: "Laptop HP Pavilion", cantidad: 1, precio: 899.99 },
      { idProducto: 4, nombre: 'Monitor 24"', cantidad: 1, precio: 199.99 },
      { idProducto: 2, nombre: "Mouse Inalámbrico", cantidad: 2, precio: 25.99 },
    ],
    cliente: {
      id: 1,
      nombre: "Empresa TechSoft",
      email: "compras@techsoft.com",
      telefono: "555-1001",
      direccion: "Av. Principal 123",
    },
    vendedor: { id: 1, nombre: "Ana Rodríguez" },
  },
  {
    id: 2,
    idVendedor: 2,
    idCliente: 2,
    fecha: "2024-01-19",
    estado: "LISTO_PARA_ENTREGA",
    total: 599.97,
    productos: [
      { idProducto: 3, nombre: "Teclado Mecánico", cantidad: 2, precio: 79.99 },
      { idProducto: 5, nombre: "Impresora Multifuncional", cantidad: 1, precio: 299.99 },
    ],
    cliente: {
      id: 2,
      nombre: "Oficinas ModernCorp",
      email: "admin@moderncorp.com",
      telefono: "555-1002",
      direccion: "Calle Comercial 456",
    },
    vendedor: { id: 2, nombre: "Pedro Martínez" },
  },
  {
    id: 3,
    idVendedor: 1,
    idCliente: 3,
    fecha: "2024-01-21",
    estado: "PENDIENTE",
    total: 325.97,
    productos: [
      { idProducto: 2, nombre: "Mouse Inalámbrico", cantidad: 3, precio: 25.99 },
      { idProducto: 3, nombre: "Teclado Mecánico", cantidad: 3, precio: 79.99 },
    ],
    cliente: {
      id: 3,
      nombre: "StartUp Innovate",
      email: "contacto@innovate.com",
      telefono: "555-1003",
      direccion: "Plaza Central 789",
    },
    vendedor: { id: 1, nombre: "Ana Rodríguez" },
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const estado = searchParams.get("estado")

  let pedidosFiltrados = pedidosParaEntrega

  if (estado) {
    pedidosFiltrados = pedidosParaEntrega.filter((p) => p.estado === estado)
  }

  return NextResponse.json({
    success: true,
    message: "RF4 Cumplido: Lista de pedidos para entrega obtenida",
    pedidos: pedidosFiltrados,
  })
}

// Agregar endpoint para consultar pedido específico
export async function POST(request: NextRequest) {
  try {
    const { idPedido } = await request.json()

    const pedido = pedidosParaEntrega.find((p) => p.id === idPedido)

    if (!pedido) {
      return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "RF4 Cumplido: Información del pedido obtenida",
      pedido,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
