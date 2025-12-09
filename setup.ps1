# Script de instalação rápida do Turistar Sul
# Execute: .\setup.ps1

Write-Host "`n🌴 Turistar Sul - Setup Inicial`n" -ForegroundColor Green

# 1. Backend
Write-Host "📦 Instalando dependências do backend..." -ForegroundColor Cyan
Set-Location backend
Copy-Item .env.example .env -ErrorAction SilentlyContinue
npm install

# 2. Frontend
Write-Host "`n📦 Instalando dependências do frontend..." -ForegroundColor Cyan
Set-Location ../frontend
Copy-Item .env.example .env.local -ErrorAction SilentlyContinue
npm install
Set-Location ..

# 3. Banco de dados
Write-Host "`n🗄️ Configurando banco de dados..." -ForegroundColor Cyan
Set-Location backend
npx prisma generate
npx prisma db push
npx prisma db seed
Set-Location ..

Write-Host "`n✅ Setup concluído com sucesso!`n" -ForegroundColor Green
Write-Host "Para iniciar o projeto:" -ForegroundColor Yellow
Write-Host "  Backend:  cd backend ; npm run start:dev" -ForegroundColor White
Write-Host "  Frontend: cd frontend ; npm run dev`n" -ForegroundColor White
Write-Host "Acesse: http://localhost:3001" -ForegroundColor Cyan
Write-Host "API Docs: http://localhost:3000/api`n" -ForegroundColor Cyan
