# Ejecución en modo development localmente

## Iniciar el servidor mock (json-server)
```bash
cd server
npx json-server --watch db.json --routes routes.json --port 3000
```

## Iniciar la aplicación frontend
```bash
npm run dev
```

---

# Ejecución usando el backend real en modo development

1. Cambia la ruta de la API en los archivos `.env`:
   - Abre el archivo `.env.development` (y/o `.env` si aplica).
   - Modifica la variable `VITE_API_BASE_URL` para que apunte a la URL de tu backend real, por ejemplo:
     ```env
     VITE_API_BASE_URL="http://localhost:5091/api/V1"
     ```

2. Inicia la aplicación frontend normalmente:
```bash
npm run dev
```

Asegúrate de que el backend esté corriendo y accesible en la URL configurada.

