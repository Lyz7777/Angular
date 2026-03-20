# 📋 GUÍA: Forma Correcta de Abrir un Proyecto Angular

## 1️⃣ PRIMER PASO: Verificar que Node.js esté instalado
```bash
node --version
npm --version
```
Deberías ver versiones como: v18.x.x y 9.x.x

---

## 2️⃣ SEGUNDO PASO: Clonar o abrir el proyecto
Si es un proyecto que ya existe:
```bash
cd C:\ruta\del\proyecto
```

Ejemplo para tu proyecto:
```bash
cd C:\Users\USUARIO\Desktop\Uni\7\IngSoftIII\Angular\miPrimerProyecto
```

---

## 3️⃣ TERCER PASO: Instalar dependencias (IMPORTANTE ⚠️)
**La PRIMERA vez que abres el proyecto O después de cambiar ramas:**
```bash
npm install
```
O si prefieres usar yarn:
```bash
yarn install
```

Esto descargará todas las dependencias definidas en `package.json`

---

## 4️⃣ CUARTO PASO: Iniciar el servidor de desarrollo
```bash
npm start
```

O puedes usar:
```bash
ng serve
```

O con opciones específicas:
```bash
ng serve --open
```
(Abre automáticamente el navegador)

---

## 5️⃣ QUINTO PASO: Acceder a la aplicación
- **URL por defecto**: http://localhost:4200
- **Si el puerto 4200 está ocupado**, Angular te preguntará si usar otro puerto

---

## ⚠️ ERRORES COMUNES Y SOLUCIONES:

### Error: "Command not found: ng"
**Solución:**
```bash
npm install -g @angular/cli
```

### Error: "node_modules not found"
**Solución:**
```bash
npm install
```

### Error: "Port 4200 is already in use"
**Solución A** - Usa otro puerto:
```bash
ng serve --port 4300
```

**Solución B** - Mata el proceso que usa el puerto:
```bash
netstat -ano | findstr :4200
taskkill /PID <numero_pid> /F
```

### Error: "Parser Error: Unexpected character [ñ]"
**Solución**: Usa caracteres sin acentos en propiedades/variables
- ❌ `año` 
- ✅ `ano`

---

## 📝 LISTA DE VERIFICACIÓN AL ABRIR UN PROYECTO:

- [ ] **IMPORTANTE: Estoy en la carpeta CORRECTA** (debes ver `package.json` cuando escribas `dir`)
- [ ] He ejecutado `npm install` (si es primera vez)
- [ ] No hay errores en `package.json`
- [ ] Node.js está instalado correctamente
- [ ] El puerto 4200 está disponible
- [ ] He ejecutado `npm start` o `ng serve`
- [ ] Puedo acceder a http://localhost:4200

---

## 🔴 ERROR MÁS COMÚN: "Error: This command is not available when running the Angular CLI outside a workspace"

**CAUSA**: Estás en la carpeta EQUIVOCADA

**EJEMPLO INCORRECTO**:
```bash
PS C:\Users\USUARIO\Desktop\Uni\7\IngSoftIII\Angular> ng serve
```
❌ Esto NO funciona porque no hay `package.json` aquí

**SOLUCIÓN CORRECTA**:
```bash
# 1. Primero, verifica dónde están las carpetas
cd C:\Users\USUARIO\Desktop\Uni\7\IngSoftIII\Angular
dir
# Deberías ver: miPrimerProyecto (carpeta)

# 2. ENTRA a la carpeta del proyecto
cd miPrimerProyecto

# 3. Verifica que estés en el lugar correcto
dir
# Deberías ver: package.json, angular.json, src, etc.

# 4. AHORA sí puedes iniciar
npm start
```

**RESUMEN**:
- ❌ `C:\Users\USUARIO\Desktop\Uni\7\IngSoftIII\Angular\` (AQUÍ NO)
- ✅ `C:\Users\USUARIO\Desktop\Uni\7\IngSoftIII\Angular\miPrimerProyecto\` (AQUÍ SÍ)

---

## 🚀 COMANDOS ÚTILES:

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm test` | Ejecuta las pruebas unitarias |
| `npm run watch` | Compila en modo watch |
| `ng generate component nombre` | Crea un nuevo componente |
| `ng lint` | Verifica errores de código |

---

## ✅ MI PROYECTO ESPECÍFICO:

Tu proyecto **miPrimerProyecto** está bien configurado. Para abrirlo:

```bash
# 1. Abre Terminal/CMD
# 2. Navega al proyecto
cd C:\Users\USUARIO\Desktop\Uni\7\IngSoftIII\Angular\miPrimerProyecto

# 3. Instala dependencias (si es la primera vez)
npm install

# 4. Inicia el servidor
npm start

# 5. Se abrirá en http://localhost:4200
```

---

## 🔄 DESPUÉS DE HACER CAMBIOS:

- Los cambios se **refrescan automáticamente** en el navegador
- Si cambias archivos de configuración (package.json, tsconfig.json), **reinicia** el servidor

---

Espero que esta guía te ayude a abrir correctamente tu proyecto Angular siempre. 🎉

