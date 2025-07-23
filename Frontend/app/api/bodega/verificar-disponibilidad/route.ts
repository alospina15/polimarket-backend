import { type NextRequest, NextResponse } from "next/server"

const productos = [
  { id: 1, nombre: "Laptop HP Pavilion", precio: 899.99, stock: 15, stockMinimo: 5 },
  { id: 2, nombre: "Mouse Inalámbrico", precio: 25.99, stock: 50, stockMinimo: 10 },
  { id: 3, nombre: "Teclado Mecánico", precio: 79.99, stock: 30, stockMinimo: 8 },
  { id: 4, nombre: 'Monitor 24"', precio: 199.99, stock: 20, stockMinimo: 5 },
  { id: 5, nombre: "Impresora Multifuncional", precio: 299.99, stock: 8, stockMinimo: 3 },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const idProducto = searchParams.get("idProducto")

  if (idProducto) {
    const producto = productos.find((p) => p.id === Number.parseInt(idProducto))
    if (!producto) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }
    return NextResponse.json({ producto })
  }

  return NextResponse.json({ productos })
}

export async function POST(request: NextRequest) {
  try {
    const { idProducto, cantidad, tipo } = await request.json() // tipo: 'ENTRADA' o 'SALIDA'

    const producto = productos.find((p) => p.id === idProducto)
    if (!producto) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    if (tipo === "SALIDA" && producto.stock < cantidad) {
      return NextResponse.json({ error: "Stock insuficiente" }, { status: 400 })
    }

    if (tipo === "ENTRADA") {
      producto.stock += cantidad
    } else if (tipo === "SALIDA") {
      producto.stock -= cantidad
    }

    return NextResponse.json({
      success: true,
      message: `${tipo} registrada correctamente`,
      producto,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
