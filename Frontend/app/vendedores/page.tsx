"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package, AlertCircle } from "lucide-react"
import { apiService } from "@/lib/api-service"

interface Vendedor {
  id: number
  nombre: string
  email: string
  estaAutorizado: boolean
}

interface Cliente {
  id: number
  nombre: string
  email: string
}

interface Producto {
  id: number
  nombre: string
  precio: number
  stock: number
}

export default function AppVendedores() {
  const [vendedores, setVendedores] = useState<Vendedor[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [productos, setProductos] = useState<Producto[]>([])
  const [selectedVendedor, setSelectedVendedor] = useState<number | null>(null)
  const [selectedCliente, setSelectedCliente] = useState<number | null>(null)
  const [productosCarrito, setProductosCarrito] = useState<{ idProducto: number; cantidad: number }[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      // Cargar vendedores autorizados
      const vendedoresData = await apiService.getVendedores()
      setVendedores(vendedoresData.filter((v: Vendedor) => v.estaAutorizado))

      // Cargar clientes
      const clientesData = await apiService.getClientes()
      setClientes(clientesData)

      // Cargar productos
      const productosData = await apiService.getProductos()
      setProductos(productosData)
    } catch (error) {
      console.error("Error cargando datos:", error)
      setMessage("❌ Error conectando con Spring Boot backend")
    }
  }

  // RF2: Verificación de Disponibilidad
  const verificarDisponibilidad = async (idProducto: number) => {
    try {
      const data = await apiService.verificarDisponibilidad(idProducto)
      setMessage(`✅ RF2 Cumplido: Producto verificado - Stock disponible: ${data.stock}`)
      return data.stock
    } catch (error) {
      setMessage("❌ Error verificando disponibilidad")
      return 0
    }
  }

  const agregarProducto = async (idProducto: number) => {
    // RF2: Verificar disponibilidad antes de agregar
    const stockDisponible = await verificarDisponibilidad(idProducto)

    if (stockDisponible === 0) {
      setMessage("❌ Producto sin stock disponible")
      return
    }

    const existe = productosCarrito.find((p) => p.idProducto === idProducto)
    if (existe) {
      if (existe.cantidad >= stockDisponible) {
        setMessage("❌ No hay suficiente stock para agregar más unidades")
        return
      }
      setProductosCarrito((prev) =>
        prev.map((p) => (p.idProducto === idProducto ? { ...p, cantidad: p.cantidad + 1 } : p)),
      )
    } else {
      setProductosCarrito((prev) => [...prev, { idProducto, cantidad: 1 }])
    }
  }

  const generarVenta = async () => {
    if (!selectedVendedor || !selectedCliente || productosCarrito.length === 0) {
      setMessage("❌ Seleccione vendedor, cliente y productos")
      return
    }

    setLoading(true)
    try {
      const venta = {
        idVendedor: selectedVendedor,
        idCliente: selectedCliente,
        productos: productosCarrito,
      }

      const data = await apiService.generarVenta(venta)
      setMessage(`✅ Venta generada exitosamente: Pedido #${data.id}`)
      setProductosCarrito([])
      cargarDatos() // Actualizar stock
    } catch (error) {
      setMessage("❌ Error al generar venta")
    }
    setLoading(false)
  }

  const calcularTotal = () => {
    return productosCarrito
      .reduce((total, item) => {
        const producto = productos.find((p) => p.id === item.idProducto)
        return total + (producto?.precio || 0) * item.cantidad
      }, 0)
      .toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <ShoppingCart className="h-8 w-8" />
          PoliMarket - App Vendedores
          <Badge variant="outline" className="ml-4">
            Spring Boot API
          </Badge>
        </h1>

        {message && (
          <div
            className={`mb-6 p-4 border rounded-lg ${
              message.includes("✅")
                ? "bg-green-100 border-green-300"
                : message.includes("❌")
                  ? "bg-red-100 border-red-300"
                  : "bg-blue-100 border-blue-300"
            }`}
          >
            {message}
          </div>
        )}

        {vendedores.length === 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-orange-800">
                <AlertCircle className="h-5 w-5" />
                <span>No hay vendedores autorizados. Contacte a Recursos Humanos.</span>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Generación de Ventas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Generar Nueva Venta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4 p-3 bg-blue-50 rounded-lg">
                  <p>
                    <strong>RF2:</strong> Verificación de Disponibilidad
                  </p>
                  <p>
                    <strong>Endpoint:</strong> GET /api/productos/disponibilidad/:id
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Vendedor Autorizado</label>
                  <Select onValueChange={(value) => setSelectedVendedor(Number.parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar vendedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendedores.map((vendedor) => (
                        <SelectItem key={vendedor.id} value={vendedor.id.toString()}>
                          ✅ {vendedor.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cliente</label>
                  <Select onValueChange={(value) => setSelectedCliente(Number.parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientes.map((cliente) => (
                        <SelectItem key={cliente.id} value={cliente.id.toString()}>
                          {cliente.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Productos con Verificación de Stock</label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {productos.map((producto) => (
                      <div key={producto.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{producto.nombre}</p>
                          <p className="text-sm text-gray-600">
                            ${producto.precio} - Stock: {producto.stock}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => agregarProducto(producto.id)}
                          disabled={producto.stock === 0}
                          variant={producto.stock > 0 ? "default" : "secondary"}
                        >
                          {producto.stock > 0 ? "Verificar & Agregar" : "Sin Stock"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={generarVenta}
                  disabled={loading || !selectedVendedor || !selectedCliente || productosCarrito.length === 0}
                  className="w-full"
                >
                  {loading ? "Generando Venta..." : "Generar Venta"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Carrito de Compras */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Carrito de Compras
              </CardTitle>
            </CardHeader>
            <CardContent>
              {productosCarrito.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Carrito vacío</p>
              ) : (
                <div className="space-y-3">
                  {productosCarrito.map((item) => {
                    const producto = productos.find((p) => p.id === item.idProducto)
                    return (
                      <div key={item.idProducto} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{producto?.nombre}</p>
                          <p className="text-sm text-gray-600">
                            ${producto?.precio} x {item.cantidad} = $
                            {((producto?.precio || 0) * item.cantidad).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="1"
                            max={producto?.stock}
                            value={item.cantidad}
                            onChange={(e) => {
                              const nuevaCantidad = Number.parseInt(e.target.value)
                              if (nuevaCantidad > 0 && nuevaCantidad <= (producto?.stock || 0)) {
                                setProductosCarrito((prev) =>
                                  prev.map((p) =>
                                    p.idProducto === item.idProducto ? { ...p, cantidad: nuevaCantidad } : p,
                                  ),
                                )
                              }
                            }}
                            className="w-16"
                          />
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              setProductosCarrito((prev) => prev.filter((p) => p.idProducto !== item.idProducto))
                            }
                          >
                            ✕
                          </Button>
                        </div>
                      </div>
                    )
                  })}

                  <div className="border-t pt-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-lg font-bold text-green-600">${calcularTotal()}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
