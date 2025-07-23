import { type NextRequest, NextResponse } from "next/server"

const proveedores = [
  { id: 1, nombre: "Distribuidora Central", contacto: "Juan Pérez", telefono: "555-0001" },
  { id: 2, nombre: "Mayorista del Norte", contacto: "María García", telefono: "555-0002" },
  { id: 3, nombre: "Importadora Global", contacto: "Carlos López", telefono: "555-0003" },
]

const solicitudes: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { idProveedor, idProducto, cantidad, observaciones } = await request.json()

    const proveedor = proveedores.find((p) => p.id === idProveedor)
    if (!proveedor) {
      return NextResponse.json({ error: "Proveedor no encontrado" }, { status: 404 })
    }

    const nuevaSolicitud = {
      id: solicitudes.length + 1,
      idProveedor,
      idProducto,
      cantidad,
      observaciones,
      fecha: new Date().toISOString().split("T")[0],
      estado: "ENVIADA",
    }

    solicitudes.push(nuevaSolicitud)

    return NextResponse.json({
      success: true,
      message: "Solicitud enviada al proveedor",
      solicitud: nuevaSolicitud,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ proveedores, solicitudes })
}
