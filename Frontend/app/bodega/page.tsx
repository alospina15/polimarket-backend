"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Package, Truck, Users, AlertTriangle } from "lucide-react"
import { apiService } from "@/lib/api-service"

import type { Producto } from "../../types/producto";
import type { Entrega } from "../../types/entrega";

interface Proveedor {
  id: number
  nombre: string
  contacto: string
  telefono: string
}


import type { Pedido } from "@/types/pedido"



export default function AppBodega() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [entregas, setEntregas] = useState<Entrega[]>([])
  const [selectedProducto, setSelectedProducto] = useState<number | null>(null)
  const [selectedProveedor, setSelectedProveedor] = useState<number | null>(null)
  const [cantidad, setCantidad] = useState("")
  const [observaciones, setObservaciones] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  // Estados para programar entregas
  const [idPedido, setIdPedido] = useState("")
  const [fechaProgramada, setFechaProgramada] = useState("")
  const [direccionEntrega, setDireccionEntrega] = useState("")
  const [pedidoConsultado, setPedidoConsultado] = useState<Pedido | null>(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      // Cargar productos
      const productosData = await apiService.getProductos()
      setProductos(productosData)

      // Cargar proveedores
      const proveedoresData = await apiService.getProveedores()
      setProveedores(proveedoresData)

      // Cargar entregas
      const entregasData = await apiService.getEntregas()
      setEntregas(entregasData)
    } catch (error) {
      console.error("Error cargando datos:", error)
      setMessage("❌ Error conectando con Spring Boot backend")
    }
  }

  const registrarMovimiento = async (tipo: "ENTRADA" | "SALIDA") => {
    if (!selectedProducto || !cantidad) {
      setMessage("Seleccione producto y cantidad")
      return
    }

    setLoading(true)
    try {
      await apiService.registrarMovimientoInventario({
        idProducto: selectedProducto,
        cantidad: Number.parseInt(cantidad),
        tipo,
      })
      setMessage(`✅ ${tipo} registrada correctamente`)
      setCantidad("")
      cargarDatos()
    } catch (error) {
      setMessage("❌ Error al registrar movimiento")
    }
    setLoading(false)
  }

  // RF3: Solicitud de Reposición
  const solicitarProveedor = async () => {
    if (!selectedProveedor || !selectedProducto || !cantidad) {
      setMessage("❌ Complete todos los campos")
      return
    }

    const producto = productos.find((p) => p.id === selectedProducto)
    if (producto && producto.stock > (producto.stockMinimo ?? 0)) {
      setMessage("⚠️ El producto aún no requiere reposición (stock por encima del mínimo)")
      return
    }

    setLoading(true)
    try {
      await apiService.solicitarReposicion({
        idProveedor: selectedProveedor,
        idProducto: selectedProducto,
        cantidad: Number.parseInt(cantidad),
        observaciones: `RF3: Reposición automática - Stock actual: ${producto?.stock}, Stock mínimo: ${producto?.stockMinimo ?? 0}`,
      })
      setMessage(`✅ RF3 Cumplido: Solicitud de reposición enviada al proveedor`)
      setCantidad("")
      setObservaciones("")
      cargarDatos()
    } catch (error) {
      setMessage("❌ Error al solicitar producto")
    }
    setLoading(false)
  }

  const programarEntrega = async () => {
    if (!idPedido || !fechaProgramada || !direccionEntrega) {
      setMessage("Complete todos los campos de entrega")
      return
    }

    setLoading(true)
    try {
      await apiService.programarEntrega({
        idPedido: Number.parseInt(idPedido),
        fechaProgramada,
        direccionEntrega,
        observaciones,
      })
      setMessage("✅ Entrega programada correctamente")
      setIdPedido("")
      setFechaProgramada("")
      setDireccionEntrega("")
      setObservaciones("")
      cargarDatos()
    } catch (error) {
      setMessage("❌ Error al programar entrega")
    }
    setLoading(false)
  }

  // RF4: Consultar pedido
  const consultarPedido = async (idPedido: string) => {
    if (!idPedido) return

    try {
      const pedido = await apiService.getPedidoPorId(Number.parseInt(idPedido))
      setPedidoConsultado(pedido)
      setDireccionEntrega(pedido.cliente.direccion)
      setMessage(`✅ RF4 Cumplido: Pedido encontrado para ${pedido.cliente.nombre}`)
    } catch (error) {
      setPedidoConsultado(null)
      setMessage("❌ Pedido no encontrado")
    }
  }

  const productosConStockBajo = productos.filter((p) => p.stock <= (p.stockMinimo ?? 0))

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Package className="h-8 w-8" />
          PoliMarket - App Bodega
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

        {/* Alertas de Stock Bajo */}
        {productosConStockBajo.length > 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <AlertTriangle className="h-5 w-5" />
                Productos con Stock Bajo - RF3 Activado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productosConStockBajo.map((producto) => (
                  <div key={producto.id} className="p-3 bg-white border border-orange-200 rounded-lg">
                    <p className="font-medium">{producto.nombre}</p>
                    <p className="text-sm text-gray-600">Stock actual: {producto.stock}</p>
                    <p className="text-sm text-gray-600">Stock mínimo: {producto.stockMinimo}</p>
                    <Badge variant="destructive" className="mt-2">
                      Requiere Reposición
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Control de Inventario */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Control de Inventario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4 p-3 bg-blue-50 rounded-lg">
                  <p>
                    <strong>Endpoint:</strong> POST /api/inventario
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Producto</label>
                  <Select onValueChange={(value) => setSelectedProducto(Number.parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {productos.map((producto) => (
                        <SelectItem key={producto.id} value={producto.id.toString()}>
                          {producto.nombre} (Stock: {producto.stock})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cantidad</label>
                  <Input
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    placeholder="Ingrese cantidad"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => registrarMovimiento("ENTRADA")} disabled={loading} className="flex-1">
                    Registrar Entrada
                  </Button>
                  <Button
                    onClick={() => registrarMovimiento("SALIDA")}
                    disabled={loading}
                    variant="outline"
                    className="flex-1"
                  >
                    Registrar Salida
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3">Inventario Actual</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {productos.map((producto) => (
                    <div key={producto.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">{producto.nombre}</p>
                        <p className="text-sm text-gray-600">${producto.precio}</p>
                      </div>
                      <Badge variant={producto.stock <= (producto.stockMinimo ?? 0) ? "destructive" : "default"}>
                        Stock: {producto.stock}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RF3: Gestión de Proveedores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                RF3: Solicitud de Reposición
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4 p-3 bg-green-50 rounded-lg">
                  <p>
                    <strong>Endpoint:</strong> POST /api/proveedores/solicitar
                  </p>
                  <p>
                    <strong>Función:</strong> Bodega solicita productos a proveedores
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Proveedor</label>
                  <Select onValueChange={(value) => setSelectedProveedor(Number.parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {proveedores.map((proveedor) => (
                        <SelectItem key={proveedor.id} value={proveedor.id.toString()}>
                          {proveedor.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Producto a Abastecer</label>
                  <Select onValueChange={(value) => setSelectedProducto(Number.parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {productos.map((producto) => (
                        <SelectItem key={producto.id} value={producto.id.toString()}>
                          {producto.nombre} - Stock: {producto.stock} (Mín: {producto.stockMinimo ?? 0})
                          {producto.stock <= (producto.stockMinimo ?? 0) && " ⚠️ REQUIERE REPOSICIÓN"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cantidad a Solicitar</label>
                  <Input
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    placeholder="Cantidad a solicitar"
                    min="1"
                  />
                </div>

                <Button onClick={solicitarProveedor} disabled={loading} className="w-full">
                  {loading ? "Enviando..." : "RF3: Solicitar Producto"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RF4: Gestión de Entregas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              RF4: Consulta de Pedidos para Entrega
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Programar Nueva Entrega</h4>
                <div className="space-y-4">
                  <div className="text-sm text-gray-600 mb-4 p-3 bg-orange-50 rounded-lg">
                    <p>
                      <strong>Endpoint:</strong> GET /api/pedidos/:id
                    </p>
                    <p>
                      <strong>Función:</strong> Consultar pedidos para programar entregas
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">ID Pedido</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={idPedido}
                        onChange={(e) => {
                          setIdPedido(e.target.value)
                          if (e.target.value) {
                            consultarPedido(e.target.value)
                          } else {
                            setPedidoConsultado(null)
                          }
                        }}
                        placeholder="Número de pedido"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => consultarPedido(idPedido)}
                        disabled={!idPedido}
                      >
                        RF4: Consultar
                      </Button>
                    </div>
                  </div>

                  {pedidoConsultado && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h5 className="font-medium text-green-800 mb-2">✅ RF4 Cumplido - Información del Pedido</h5>
                      <div className="text-sm space-y-1">
                        <p>
                          <strong>Cliente:</strong> {pedidoConsultado.cliente.nombre}
                        </p>
                        <p>
                          <strong>Email:</strong> {pedidoConsultado.cliente.email}
                        </p>
                        <p>
                          <strong>Teléfono:</strong> {pedidoConsultado.cliente.telefono}
                        </p>
                        <p>
                          <strong>Vendedor:</strong> {pedidoConsultado.vendedor.nombre}
                        </p>
                        <p>
                          <strong>Total:</strong> ${pedidoConsultado.total}
                        </p>
                        <p>
                          <strong>Estado:</strong> {pedidoConsultado.estado}
                        </p>
                        <div>
                          <strong>Productos:</strong>
                          <ul className="ml-4 mt-1">
                            {pedidoConsultado.productos.map((prod: any, index: number) => (
                              <li key={index}>
                                • {prod.nombre} x{prod.cantidad} - ${prod.precio}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">Fecha Programada</label>
                    <Input type="date" value={fechaProgramada} onChange={(e) => setFechaProgramada(e.target.value)} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Dirección de Entrega</label>
                    <Textarea
                      value={direccionEntrega}
                      onChange={(e) => setDireccionEntrega(e.target.value)}
                      placeholder="Dirección completa de entrega"
                      rows={3}
                    />
                  </div>

                  <Button onClick={programarEntrega} disabled={loading} className="w-full">
                    {loading ? "Programando..." : "Programar Entrega"}
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Entregas Programadas</h4>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {entregas.map((entrega, idx) => (
                    <div key={entrega.id != null ? entrega.id : `entrega-${idx}`} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Entrega #{entrega.id}</p>
                        <Badge variant={entrega.estado === "PROGRAMADA" ? "default" : "secondary"}>
                          {entrega.estado}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Pedido: #{entrega.idPedido}</p>
                      <p className="text-sm text-gray-600">Fecha: {entrega.fecha}</p>
                      <p className="text-sm text-gray-600">Dirección: {entrega.direccionEntrega}</p>
                    </div>
                  ))}
                  {entregas.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No hay entregas programadas</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
