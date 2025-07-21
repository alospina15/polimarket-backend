#!/bin/bash

echo "🚀 Configurando PoliMarket Monorepo..."

# 1. Verificar que estamos en el directorio correcto
if [ ! -f "pom.xml" ]; then
    echo "❌ Error: No se encontró pom.xml. Ejecuta este script desde la raíz del proyecto Spring Boot."
    exit 1
fi

# 2. Crear estructura de carpetas
echo "📁 Creando estructura de carpetas..."
mkdir -p frontend
mkdir -p scripts
mkdir -p docs

# 3. Mover código de Spring Boot a carpeta backend
echo "📦 Organizando código del backend..."
mkdir -p backend
mv src backend/
mv pom.xml backend/
mv mvnw backend/
mv mvnw.cmd backend/
mv .mvn backend/

# 4. Crear archivos de configuración
echo "⚙️ Creando archivos de configuración..."

# Package.json raíz
cat > package.json << 'EOF'
{
  "name": "polimarket-monorepo",
  "version": "1.0.0",
  "description": "Sistema Integral de Gestión Empresarial",
  "scripts": {
    "dev": "concurrently \"npm run backend:dev\" \"npm run frontend:dev\"",
    "backend:dev": "cd backend && ./mvnw spring-boot:run",
    "frontend:dev": "cd frontend && npm run dev",
    "build": "npm run backend:build && npm run frontend:build",
    "backend:build": "cd backend && ./mvnw clean package",
    "frontend:build": "cd frontend && npm run build",
    "test": "npm run backend:test && npm run frontend:test",
    "backend:test": "cd backend && ./mvnw test",
    "frontend:test": "cd frontend && npm run test"
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}
EOF

# 5. Crear .gitignore actualizado
cat > .gitignore << 'EOF'
# Backend (Spring Boot)
backend/target/
backend/.mvn/wrapper/maven-wrapper.jar
backend/.mvn/wrapper/maven-wrapper.properties

# Frontend (Next.js)
frontend/.next/
frontend/out/
frontend/node_modules/
frontend/.env*.local

# IDEs
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Database
*.db
*.sqlite
EOF

echo "✅ Monorepo configurado exitosamente!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Copia el código del frontend de v0 a la carpeta 'frontend/'"
echo "2. Ejecuta: npm install"
echo "3. Ejecuta: npm run dev"
echo ""
echo "🌐 URLs:"
echo "- Frontend: http://localhost:3000"
echo "- Backend: http://localhost:8081"
echo "- Swagger: http://localhost:8081/swagger-ui.html"
