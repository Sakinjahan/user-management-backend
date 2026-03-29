@echo off
echo Starting Zentask Backend Development Server...
echo =============================================

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

echo Starting development server with nodemon...
npx nodemon --exec ts-node server.ts

pause