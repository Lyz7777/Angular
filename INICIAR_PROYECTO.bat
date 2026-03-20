@echo off
REM Script para iniciar el proyecto Angular correctamente
REM =====================================================

echo.
echo ========================================
echo    INICIANDO PROYECTO ANGULAR
echo ========================================
echo.

REM Ir a la carpeta correcta
cd /d C:\Users\USUARIO\Desktop\Uni\7\IngSoftIII\Angular\miPrimerProyecto

REM Verificar que estamos en la carpeta correcta
echo Carpeta actual:
cd

echo.
echo Archivos encontrados:
dir | findstr "package.json angular.json"

echo.
echo ========================================
echo    INICIANDO SERVIDOR (npm start)
echo ========================================
echo.
echo La aplicacion se abrira en: http://localhost:4200
echo Presiona CTRL+C para detener el servidor
echo.

REM Iniciar el servidor
npm start

pause

