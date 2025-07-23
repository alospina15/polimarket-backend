"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink, Code, Database } from "lucide-react"

export default function SwaggerDocs() {
  const [apiDoc, setApiDoc] = useState<any>(null)
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/docs")
      .then((res) => res.json())
      .then((data) => setApiDoc(data))
      .catch((err) => console.error("Error loading API docs:", err))
  }, [])

  if (!apiDoc) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Cargando documentación de APIs...</p>
        </div>
      </div>
    )
  }

  const getMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case "get":
        return "bg-green-100 text-green-800"
      case "post":
        return "bg-blue-100 text-blue-800"
      case "put":
        return "bg-orange-100 text-orange-800"
      case "delete":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="h-8 w-8" />
            {apiDoc.info.title}
          </h1>
          <p className="text-gray-600 mb-4">{apiDoc.info.description}</p>
          <div className="flex items-center gap-4">
            <Badge variant="outline">Versión {apiDoc.info.version}</Badge>
            <Badge variant="outline">OpenAPI 3.0.0</Badge>
            <Badge variant="outline">5 Requisitos Funcionales</Badge>
          </div>
        </div>

        {/* Resumen de Requisitos Funcionales */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Requisitos Funcionales Implementados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-800">RF1: Autorización de Vendedores</h4>
                <p className="text-sm text-purple-600 mt-1">RRHH autoriza vendedores para acceso a sistemas</p>
                <Badge className="mt-2 bg-purple-600">POST /rrhh/autorizar-vendedor</Badge>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800">RF2: Verificación de Disponibilidad</h4>
                <p className="text-sm text-blue-600 mt-1">Ventas consulta stock en bodega</p>
                <Badge className="mt-2 bg-blue-600">GET /bodega/verificar-disponibilidad</Badge>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800">RF3: Solicitud de Reposición</h4>
                <p className="text-sm text-green-600 mt-1">Bodega solicita productos a proveedores</p>
                <Badge className="mt-2 bg-green-600">POST /proveedores/solicitar-producto</Badge>
              </div>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium text-orange-800">RF4: Consulta de Pedidos</h4>
                <p className="text-sm text-orange-600 mt-1">Entregas consulta pedidos para despacho</p>
                <Badge className="mt-2 bg-orange-600">GET /entregas/consultar-pedidos</Badge>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800">RF5: Suministro de Productos</h4>
                <p className="text-sm text-red-600 mt-1">Proveedores suministran productos a bodega</p>
                <Badge className="mt-2 bg-red-600">POST /proveedores/suministrar-productos</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endpoints por Categoría */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {apiDoc.tags.map((tag: any) => (
            <Card key={tag.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  {tag.name}
                </CardTitle>
                <p className="text-sm text-gray-600">{tag.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(apiDoc.paths)
                    .filter(([path, methods]: [string, any]) =>
                      Object.values(methods).some((method: any) => method.tags?.includes(tag.name)),
                    )
                    .map(([path, methods]: [string, any]) =>
                      Object.entries(methods).map(([method, details]: [string, any]) => {
                        if (!details.tags?.includes(tag.name)) return null
                        const endpointKey = `${method.toUpperCase()} ${path}`
                        return (
                          <div
                            key={endpointKey}
                            className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                            onClick={() => setSelectedEndpoint(selectedEndpoint === endpointKey ? null : endpointKey)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Badge className={getMethodColor(method)}>{method.toUpperCase()}</Badge>
                                <code className="text-sm font-mono">{path}</code>
                              </div>
                              <ExternalLink className="h-4 w-4 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{details.summary}</p>

                            {selectedEndpoint === endpointKey && (
                              <div className="mt-4 p-4 bg-gray-50 rounded border-t">
                                <h5 className="font-medium mb-2">Descripción:</h5>
                                <p className="text-sm text-gray-700 mb-4">{details.description}</p>

                                {details.requestBody && (
                                  <div className="mb-4">
                                    <h5 className="font-medium mb-2">Request Body:</h5>
                                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                                      {JSON.stringify(details.requestBody.content["application/json"].schema, null, 2)}
                                    </pre>
                                  </div>
                                )}

                                {details.parameters && (
                                  <div className="mb-4">
                                    <h5 className="font-medium mb-2">Parámetros:</h5>
                                    {details.parameters.map((param: any, index: number) => (
                                      <div key={index} className="text-sm mb-1">
                                        <code>{param.name}</code> ({param.in}) - {param.description}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                <div>
                                  <h5 className="font-medium mb-2">Respuestas:</h5>
                                  {Object.entries(details.responses).map(([code, response]: [string, any]) => (
                                    <div key={code} className="text-sm mb-1">
                                      <Badge
                                        variant={code.startsWith("2") ? "default" : "destructive"}
                                        className="mr-2"
                                      >
                                        {code}
                                      </Badge>
                                      {response.description}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      }),
                    )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Esquemas */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Esquemas de Datos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(apiDoc.components.schemas).map(([name, schema]: [string, any]) => (
                <div key={name} className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">{name}</h4>
                  <div className="text-sm space-y-1">
                    {Object.entries(schema.properties || {}).map(([prop, details]: [string, any]) => (
                      <div key={prop} className="flex justify-between">
                        <code className="text-blue-600">{prop}</code>
                        <span className="text-gray-500">{details.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
                <a href="/api/docs" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  JSON Schema
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
