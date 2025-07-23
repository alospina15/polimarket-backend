"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, CheckCircle, XCircle, UserPlus } from "lucide-react"
import { apiService } from "@/lib/api-service"

import type { Vendedor } from "@/types/vendedor"

export default function AppRRHH() {
  const [vendedores, setVendedores] = useState<Vendedor[]>([])
  const [nuevoVendedor, setNuevoVendedor] = useState({ nombre: "", email: "" })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    cargarVendedores()
  }, [])

  const cargarVendedores = async () => {
    try {
      const data = await apiService.getVendedores()
      setVendedores(data)
    } catch (error) {
      console.error("Error cargando vendedores:", error)
      setMessage("❌ Error conectando con el servidor Spring Boot")
    }
  }

  // RF1: Autorización de Vendedores
  const autorizarVendedor = async (idVendedor: number, autorizar: boolean) => {
    setLoading(true)
    try {
      await apiService.autorizarVendedor(idVendedor, autorizar)
      setMessage(`✅ RF1 Cumplido: Vendedor ${autorizar ? "autorizado" : "desautorizado"} correctamente`)
      cargarVendedores()
    } catch (error) {
      setMessage("❌ Error al autorizar vendedor")
    }
    setLoading(false)
  }

  const registrarVendedor = async () => {
    if (!nuevoVendedor.nombre || !nuevoVendedor.email) {
      setMessage("Complete todos los campos")
      return
    }

    setLoading(true)
    try {
      await apiService.registrarVendedor(nuevoVendedor)
      setMessage("✅ Vendedor registrado correctamente")
      setNuevoVendedor({ nombre: "", email: "" })
      cargarVendedores()
    } catch (error) {
      setMessage("❌ Error al registrar vendedor")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Users className="h-8 w-8" />
          PoliMarket - App Recursos Humanos
          <Badge variant="outline" className="ml-4">
            Spring Boot Backend
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Registro de Nuevos Vendedores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Registrar Nuevo Vendedor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre Completo</label>
                  <Input
                    value={nuevoVendedor.nombre}
                    onChange={(e) => setNuevoVendedor((prev) => ({ ...prev, nombre: e.target.value }))}
                    placeholder="Ingrese nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Corporativo</label>
                  <Input
                    type="email"
                    value={nuevoVendedor.email}
                    onChange={(e) => setNuevoVendedor((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="vendedor@polimarket.com"
                  />
                </div>
                <Button onClick={registrarVendedor} disabled={loading} className="w-full">
                  {loading ? "Registrando..." : "Registrar Vendedor"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* RF1: Autorización de Vendedores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                RF1: Autorización de Vendedores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4 p-3 bg-blue-50 rounded-lg">
                  <p>
                    <strong>Backend:</strong> Spring Boot (Puerto 8081)
                  </p>
                  <p>
                    <strong>Endpoint:</strong> POST /api/vendedores/autorizar
                  </p>
                  <p>
                    <strong>Actor:</strong> Personal de Recursos Humanos
                  </p>
                </div>

                {vendedores.map((vendedor) => (
                  <div key={vendedor.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{vendedor.nombre}</p>
                      <p className="text-sm text-gray-600">{vendedor.email}</p>
                      {vendedor.fechaAutorizacion && (
                        <p className="text-xs text-gray-500">
                          Autorizado: {new Date(vendedor.fechaAutorizacion).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={vendedor.estaAutorizado ? "default" : "secondary"}>
                        {vendedor.estaAutorizado ? "✅ Autorizado" : "❌ No Autorizado"}
                      </Badge>
                      <Button
                        size="sm"
                        variant={vendedor.estaAutorizado ? "destructive" : "default"}
                        onClick={() => autorizarVendedor(vendedor.id, !vendedor.estaAutorizado)}
                        disabled={loading}
                      >
                        {vendedor.estaAutorizado ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información de Conexión */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Estado de Conexión con Backend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">Spring Boot</p>
                <p className="text-sm text-gray-600">Framework Backend</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">:8081</p>
                <p className="text-sm text-gray-600">Puerto del Servidor</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">H2</p>
                <p className="text-sm text-gray-600">Base de Datos</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Swagger UI:</strong>
                <a
                  href="http://localhost:8081/swagger-ui.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-2"
                >
                  http://localhost:8081/swagger-ui.html
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
