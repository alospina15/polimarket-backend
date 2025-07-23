"use client"

import { Component, type ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error capturado por ErrorBoundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Error de Conexión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">No se pudo conectar con el backend de Spring Boot. Verifica que:</p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• El servidor Spring Boot esté ejecutándose</li>
                  <li>• El puerto 8081 esté disponible</li>
                  <li>• No haya problemas de CORS</li>
                </ul>
                <div className="flex gap-2">
                  <Button onClick={() => this.setState({ hasError: false })} className="flex-1" variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reintentar
                  </Button>
                  <Button asChild className="flex-1">
                    <a href="/test-connection">Probar Conexión</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
