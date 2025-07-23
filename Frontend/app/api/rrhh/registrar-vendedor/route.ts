import { type NextRequest, NextResponse } from "next/server"

// Simulamos conexión a base de datos
const vendedores = [
  {
    id: 1,
    nombre: "Ana Rodríguez",
    email: "ana@polimarket.com",
    estaAutorizado: true,
    fechaAutorizacion: "2024-01-15",
  },
  {
    id: 2,
    nombre: "Pedro Martínez",
    email: "pedro@polimarket.com",
    estaAutorizado: true,
    fechaAutorizacion: "2024-01-16",
  },
  { id: 3, nombre: "Laura Sánchez", email: "laura@polimarket.com", estaAutorizado: false },
]

export async function POST(request: NextRequest) {
  try {
    const { nombre, email } = await request.json()

    // Verificar si el email ya existe
    const existeVendedor = vendedores.find((v) => v.email === email)
    if (existeVendedor) {
      return NextResponse.json({ error: "El email ya está registrado" }, { status: 400 })
    }

    const nuevoVendedor = {
      id: vendedores.length + 1,
      nombre,
      email,
      estaAutorizado: false,
    }

    vendedores.push(nuevoVendedor)

    return NextResponse.json({
      success: true,
      message: "Vendedor registrado correctamente",
      vendedor: nuevoVendedor,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
