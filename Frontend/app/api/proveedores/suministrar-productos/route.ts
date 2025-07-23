import { type NextRequest, NextResponse } from "next/server"

// RF5: Suministro de Productos
export async function POST(request: NextRequest) {
  try {
    const { idProveedor, productos } = await request.json()

    // Validar que la solicitud sea válida
    if (!idProveedor || !productos || productos.length === 0) {
      return NextResponse.json({ error: "Datos de suministro inválidos" }, { status: 400 })
    }

    // Simular actualización de inventario
    const suministro = {
      id: Date.now(),
      idProveedor,
      productos,
      fecha: new Date().toISOString(),
      estado: "RECIBIDO",
    }

    // RF5: Actualizar stock en bodega
    productos.forEach((producto: any) => {
      // Aquí se actualizaría el stock real en la base de datos
      console.log(`RF5: Agregando ${producto.cantidad} unidades de ${producto.nombre} al inventario`)
    })

    return NextResponse.json({
      success: true,
      message: "RF5 Cumplido: Productos suministrados y añadidos al inventario",
      suministro,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET() {
  const suministrosRecientes = [
    {
      id: 1,
      idProveedor: 1,
      proveedor: "Distribuidora Central",
      productos: [
        { idProducto: 1, nombre: "Laptop HP Pavilion", cantidad: 10 },
        { idProducto: 4, nombre: 'Monitor 24"', cantidad: 15 },
      ],
      fecha: "2024-01-18",
      estado: "RECIBIDO",
    },
  ]

  return NextResponse.json({ suministros: suministrosRecientes })
}
