import { type NextRequest, NextResponse } from "next/server"

// Simulamos conexión a base de datos
const vendedores = [
  {
    id: 1,
    nombre: "Ana Rodríguez",
    email: "ana@polimarket.com",
    estaAutorizado: true,
    fechaAutorizacion: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    nombre: "Pedro Martínez",
    email: "pedro@polimarket.com",
    estaAutorizado: true,
    fechaAutorizacion: "2024-01-16T14:20:00Z",
  },
  { id: 3, nombre: "Laura Sánchez", email: "laura@polimarket.com", estaAutorizado: false },
]

export async function POST(request: NextRequest) {
  try {
    const { idVendedor, autorizar } = await request.json()

    const vendedor = vendedores.find((v) => v.id === idVendedor)
    if (!vendedor) {
      return NextResponse.json({ error: "Vendedor no encontrado" }, { status: 404 })
    }

    vendedor.estaAutorizado = autorizar

    // RF1: Registrar fecha de autorización
    if (autorizar) {
      vendedor.fechaAutorizacion = new Date().toISOString()
    } else {
      delete vendedor.fechaAutorizacion
    }

    return NextResponse.json({
      success: true,
      message: `RF1 Completado: Vendedor ${autorizar ? "autorizado" : "desautorizado"} correctamente`,
      vendedor,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ vendedores })
}
