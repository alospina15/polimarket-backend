"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2, Server, Database, Globe } from "lucide-react"
import { API_CONFIG } from "@/lib/api-config"

interface TestResult {
  name: string
  endpoint: string
  status: "pending" | "success" | "error"
  message: string
  responseTime?: number
  data?: any
}

export default function TestConnection() {
  const [tests, setTests] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [overallStatus, setOverallStatus] = useState<"idle" | "testing" | "success" | "error">("idle")

  const testEndpoints: Omit<TestResult, "status" | "message">[] = [
    {
      name: "RF1: Obtener Vendedores",
      endpoint: API_CONFIG.ENDPOINTS.VENDEDORES,
    },
    {
      name: "RF2: Obtener Productos",
      endpoint: API_CONFIG.ENDPOINTS.PRODUCTOS,
    },
    {
      name: "RF3: Obtener Proveedores",
      endpoint: API_CONFIG.ENDPOINTS.PROVEEDORES,
    },
    {
      name: "RF4: Consultar Pedidos",
      endpoint: API_CONFIG.ENDPOINTS.PEDIDOS,
    },
    {
      name: "Obtener Clientes",
      endpoint: API_CONFIG.ENDPOINTS.CLIENTES,
    },
    {
      name: "Obtener Entregas",
      endpoint: API_CONFIG.ENDPOINTS.ENTREGAS,
    },
  ]

  const runSingleTest = async (test: Omit<TestResult, "status" | "message">): Promise<TestResult> => {
    const startTime = Date.now()
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${test.endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      const responseTime = Date.now() - startTime

      if (response.ok) {
        const data = await response.json()
        return {
          ...test,
          status: "success",
          message: `✅ Conectado exitosamente (${response.status})`,
          responseTime,
          data: Array.isArray(data) ? `${data.length} elementos` : "Datos recibidos",
        }
      } else {
        return {
          ...test,
          status: "error",
          message: `❌ Error HTTP ${response.status}: ${response.statusText}`,
          responseTime,
        }
      }
    } catch (error) {
      const responseTime = Date.now() - startTime
      return {
        ...test,
        status: "error",
        message: `❌ Error de conexión: ${error instanceof Error ? error.message : "Error desconocido"}`,
        responseTime,
      }
    }
  }

  const runAllTests = async () => {
    setIsRunning(true)
    setOverallStatus("testing")

    // Inicializar tests como pending
    const initialTests = testEndpoints.map((test) => ({
      ...test,
      status: "pending" as const,
      message: "Probando...",
    }))
    setTests(initialTests)

    const results: TestResult[] = []
    let successCount = 0

    for (let i = 0; i < testEndpoints.length; i++) {
      const result = await runSingleTest(testEndpoints[i])
      results.push(result)

      if (result.status === "success") {
        successCount++
      }

      // Actualizar el estado con el resultado actual
      setTests([...results, ...initialTests.slice(i + 1)])
    }

    setTests(results)
    setOverallStatus(successCount === testEndpoints.length ? "success" : "error")
    setIsRunning(false)
  }

  const testSpringBootHealth = async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/actuator/health`)
      return response.ok
    } catch {
      return false
    }
  }

  const testSwaggerUI = async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/swagger-ui.html`)
      return response.ok
    } catch {
      return false
    }
  }

  useEffect(() => {
    // Auto-run tests on component mount
    runAllTests()
  }, [])

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "pending":
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
    }
  }

  const getStatusColor = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
      case "pending":
        return "border-blue-200 bg-blue-50"
    }
  }

  const successCount = tests.filter((t) => t.status === "success").length
  const errorCount = tests.filter((t) => t.status === "error").length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Server className="h-8 w-8" />
          Prueba de Conectividad - Spring Boot Backend
        </h1>

        {/* Estado General */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Estado de Conexión
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{API_CONFIG.BASE_URL}</p>
                <p className="text-sm text-gray-600">URL del Backend</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{successCount}</p>
                <p className="text-sm text-gray-600">Endpoints OK</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{errorCount}</p>
                <p className="text-sm text-gray-600">Endpoints Error</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{tests.length}</p>
                <p className="text-sm text-gray-600">Total Tests</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    overallStatus === "success"
                      ? "default"
                      : overallStatus === "error"
                        ? "destructive"
                        : overallStatus === "testing"
                          ? "secondary"
                          : "outline"
                  }
                >
                  {overallStatus === "success" && "✅ Todos los tests pasaron"}
                  {overallStatus === "error" && "❌ Algunos tests fallaron"}
                  {overallStatus === "testing" && "🔄 Ejecutando tests..."}
                  {overallStatus === "idle" && "⏳ Listo para probar"}
                </Badge>
              </div>
              <Button onClick={runAllTests} disabled={isRunning}>
                {isRunning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Probando...
                  </>
                ) : (
                  "Ejecutar Tests"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resultados de Tests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {tests.map((test, index) => (
            <Card key={index} className={`border-2 ${getStatusColor(test.status)}`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="flex items-center gap-2">
                    {getStatusIcon(test.status)}
                    {test.name}
                  </span>
                  {test.responseTime && (
                    <Badge variant="outline" className="text-xs">
                      {test.responseTime}ms
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <p className="text-sm font-mono text-gray-600">{test.endpoint}</p>
                  <p className="text-sm">{test.message}</p>
                  {test.data && (
                    <p className="text-xs text-gray-500">
                      <strong>Respuesta:</strong> {test.data}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enlaces Útiles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Enlaces de Desarrollo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" asChild>
                <a href={`${API_CONFIG.BASE_URL}/swagger-ui.html`} target="_blank" rel="noopener noreferrer">
                  🔗 Swagger UI
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={`${API_CONFIG.BASE_URL}/h2-console`} target="_blank" rel="noopener noreferrer">
                  🗄️ H2 Console
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={`${API_CONFIG.BASE_URL}/actuator/health`} target="_blank" rel="noopener noreferrer">
                  ❤️ Health Check
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Instrucciones */}
        <Alert className="mt-6">
          <Server className="h-4 w-4" />
          <AlertDescription>
            <strong>Instrucciones:</strong>
            <br />
            1. Asegúrate de que el backend Spring Boot esté ejecutándose en el puerto 8081
            <br />
            2. Verifica que las APIs estén disponibles en Swagger UI
            <br />
            3. Si hay errores de CORS, configura el backend para permitir requests desde localhost:3000
            <br />
            4. Los endpoints pueden variar según la implementación del backend
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
