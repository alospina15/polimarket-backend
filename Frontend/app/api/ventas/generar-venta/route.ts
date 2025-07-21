import { type NextRequest, NextResponse } from "next/server"

// Datos simulados
const clientes = [
  { id: 1, nombre: "Empresa TechSoft", email: "compras@techsoft.com" },
  { id: 2, nombre: "Oficinas ModernCorp", email: "admin@moderncorp.com" },
  { id: 3, nombre: "StartUp Innovate", email: "contacto@innovate.com" },
]

const productos = [
  { id: 1, nombre: "Laptop HP Pavilion", precio: 899.99, stock: 15 },
  { id: 2, nombre: "Mouse Inalámbrico", precio: 25.99, stock: 50 },
  { id: 3, nombre: "Teclado Mecánico", precio: 79.99, stock: 30 },
  { id: 4, nombre: 'Monitor 24"', precio: 199.99, stock: 20 },
  { id: 5, nombre: "Impresora Multifuncional", precio: 299.99, stock: 8 },
]

const pedidos: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { idVendedor, idCliente, productosSeleccionados } = await request.json()

    // Validar disponibilidad de productos
    for (const item of productosSeleccionados) {
      const producto = productos.find((p) => p.id === item.idProducto)
      if (!producto || producto.stock < item.cantidad) {
        return NextResponse.json(
          {
            error: `Stock insuficiente para ${producto?.nombre || "producto"}`,
          },
          { status: 400 },
        )
      }
    }

    // Calcular total
    const total = productosSeleccionados.reduce((sum: number, item: any) => {
      const producto = productos.find((p) => p.id === item.idProducto)
      return sum + producto!.precio * item.cantidad
    }, 0)

    // Crear pedido
    const nuevoPedido = {
      id: pedidos.length + 1,
      idVendedor,
      idCliente,
      fecha: new Date().toISOString().split("T")[0],
      estado: "PENDIENTE",
      total,
      productos: productosSeleccionados,
    }

    pedidos.push(nuevoPedido)

    // Actualizar stock
    productosSeleccionados.forEach((item: any) => {
      const producto = productos.find((p) => p.id === item.idProducto)
      if (producto) {
        producto.stock -= item.cantidad
      }
    })

    return NextResponse.json({
      success: true,
      message: "Venta generada correctamente",
      pedido: nuevoPedido,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ clientes, productos, pedidos })
}
