import { type NextRequest, NextResponse } from "next/server"

const entregas: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { idPedido, fechaProgramada, direccionEntrega, observaciones } = await request.json()

    const nuevaEntrega = {
      id: entregas.length + 1,
      idPedido,
      fechaProgramada,
      direccionEntrega,
      observaciones,
      estado: "PROGRAMADA",
      fechaCreacion: new Date().toISOString(),
    }

    entregas.push(nuevaEntrega)

    return NextResponse.json({
      success: true,
      message: "Entrega programada correctamente",
      entrega: nuevaEntrega,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ entregas })
}

export async function PUT(request: NextRequest) {
  try {
    const { idEntrega, estado, fechaEntrega } = await request.json()

    const entrega = entregas.find((e) => e.id === idEntrega)
    if (!entrega) {
      return NextResponse.json({ error: "Entrega no encontrada" }, { status: 404 })
    }

    entrega.estado = estado
    if (fechaEntrega) {
      entrega.fechaEntrega = fechaEntrega
    }

    return NextResponse.json({
      success: true,
      message: "Estado de entrega actualizado",
      entrega,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
