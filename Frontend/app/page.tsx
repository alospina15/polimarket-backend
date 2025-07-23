"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Package, Building2, ArrowRight, FileText, Server, ExternalLink } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">PoliMarket</h1>
          <p className="text-xl text-gray-600 mb-4">Sistema Integral de Gestión Empresarial</p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              Spring Boot Backend
            </Badge>
            <Badge variant="outline">Java 21</Badge>
            <Badge variant="outline">H2 Database</Badge>
            <Badge variant="outline">Puerto 8081</Badge>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Building2 className="h-4 w-4" />
            <span>5 Requisitos Funcionales • 3 Aplicaciones Cliente • Arquitectura Distribuida</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* App RRHH */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-6 w-6 text-purple-600" />
                App RRHH
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Aplicación para Recursos Humanos con autorización de vendedores.</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>RF1: Autorización de vendedores</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Registro de personal</span>
                </div>
              </div>

              <Link href="/rrhh">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Acceder
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* App Vendedores */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-6 w-6 text-blue-600" />
                App Vendedores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Aplicación para vendedores autorizados con gestión de ventas.</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>RF2: Verificación disponibilidad</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Generación de ventas</span>
                </div>
              </div>

              <Link href="/vendedores">
                <Button className="w-full">
                  Acceder
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* App Bodega */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Package className="h-6 w-6 text-green-600" />
                App Bodega
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Gestión de inventario, proveedores y entregas.</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>RF3: Solicitud reposición</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>RF4: Consulta pedidos</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>RF5: Suministro productos</span>
                </div>
              </div>

              <Link href="/bodega">
                <Button className="w-full bg-transparent" variant="outline">
                  Acceder
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Swagger Documentation */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-indigo-600" />
                Swagger UI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Documentación interactiva de las APIs de Spring Boot.</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>APIs documentadas</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Pruebas interactivas</span>
                </div>
              </div>

              <Button className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
                <a href="http://localhost:8081/swagger-ui.html" target="_blank" rel="noopener noreferrer">
                  Abrir Swagger
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Información del Backend */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Configuración del Backend Spring Boot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">Spring Boot</p>
                <p className="text-sm text-gray-600">Framework</p>
                <p className="text-xs text-gray-500">v3.3.1</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">Java 21</p>
                <p className="text-sm text-gray-600">Lenguaje</p>
                <p className="text-xs text-gray-500">LTS</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">H2</p>
                <p className="text-sm text-gray-600">Base de Datos</p>
                <p className="text-xs text-gray-500">En memoria</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">:8081</p>
                <p className="text-sm text-gray-600">Puerto</p>
                <p className="text-xs text-gray-500">HTTP</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Arquitectura del Sistema */}
        <Card>
          <CardHeader>
            <CardTitle>Arquitectura del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium">Componente RRHH</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium">Componente Ventas</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium">Componente Bodega</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium">Componente Proveedores</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="w-12 h-12 bg-red-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium">Componente Entregas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enlaces útiles */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Enlaces Útiles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" asChild>
                <a href="/test-connection">
                  <Server className="h-4 w-4 mr-2" />
                  Probar Conectividad
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="http://localhost:8081/swagger-ui.html" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Swagger UI
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/rrhh" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  App RRHH
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/vendedores" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  App Vendedores
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/bodega" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  App Bodega
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
