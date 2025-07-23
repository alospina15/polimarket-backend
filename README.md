# PoliMarket - Sistema Integral de Gestión Empresarial

## 🏗️ Arquitectura
- **Backend**: Spring Boot 3.3.1 + Java 21 + H2/PostgreSQL
- **Frontend**: Next.js 14 + React + TypeScript + Tailwind CSS
- **Documentación**: Swagger UI + OpenAPI 3.0

## 🚀 Desarrollo Local

### Opción 1: Con Docker (Recomendado)
\`\`\`bash
# Ejecutar todo el stack
docker-compose up -d

# Acceder a las aplicaciones
# Frontend: http://localhost:3000
# Backend: http://localhost:8081
# Swagger: http://localhost:8081/swagger-ui.html
\`\`\`

### Opción 2: Manual
\`\`\`bash
# Terminal 1: Backend
cd backend
./mvnw spring-boot:run

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
\`\`\`

## 📋 Requisitos Funcionales Implementados
- ✅ RF1: Autorización de Vendedores
- ✅ RF2: Verificación de Disponibilidad
- ✅ RF3: Solicitud de Reposición
- ✅ RF4: Consulta de Pedidos para Entrega
- ✅ RF5: Suministro de Productos

## 🌐 URLs de Desarrollo
- Frontend: http://localhost:3000
- Backend API: http://localhost:8081/api
- Swagger UI: http://localhost:8081/swagger-ui.html
- H2 Console: http://localhost:8081/h2-console
