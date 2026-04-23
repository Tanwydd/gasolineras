# ⛽ Carburantes España

Dashboard web para consultar los precios de carburantes en tiempo real en todas las gasolineras de España, con datos directos de la API del Ministerio de Industria y Turismo (METUR).

**[🔗 Ver demo →](https://tanwydd.github.io/gasolineras/)**

---

## ✨ Características

- 🔴 **Datos en tiempo real** desde la API oficial del Ministerio
- 🏪 **+10.000 gasolineras** de toda España
- 🔍 **Filtros** por provincia y municipio (en cascada)
- ⭐ **Destaca automáticamente** la estación más barata de cada vista
- 📊 **Estadísticas** en vivo: mínimo y media de G95 y Gasóleo A
- 🔄 **Auto-refresco** cada 30 minutos
- 📱 **Responsive** — optimizado para móvil
- ⚡ **Sin backend** — HTML + JS puro, funciona desde cualquier hosting estático

---

## 🚀 Despliegue en GitHub Pages

```bash
git clone https://github.com/Tanwydd/gasolineras.git
cd gasolineras

# Subir a GitHub Pages
git add .
git commit -m "init"
git push origin main
```

Luego en GitHub → **Settings → Pages → Source: `main / root`** → Save.

En menos de 2 minutos disponible en:
```
https://tanwydd.github.io/gasolineras/
```

---

## 🖥️ Ejecución local

No necesita servidor. Abre directamente en el navegador:

```bash
# Opción 1 — abrir el fichero directo
open index.html

# Opción 2 — servidor local mínimo con Python
python3 -m http.server 8000
# → http://localhost:8000
```

### En Termux (Android)

```bash
pkg install python
python -m http.server 8000
```

Abre `http://localhost:8000` en el navegador del móvil.

---

## 📡 Fuente de datos

API REST pública del Ministerio de Industria, Comercio y Turismo:

```
GET https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/
```

- Sin autenticación requerida
- CORS abierto (consumible desde el navegador)
- Actualizada por el Ministerio varias veces al día

---

## 🗂️ Estructura

```
gasolineras/
└── index.html    # Aplicación completa (HTML + CSS + JS en un solo fichero)
└── README.md
```

---

## 🛠️ Stack técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5 + CSS3 + JavaScript vanilla |
| Diseño | Glassmorphism, backdrop-filter, CSS variables |
| Tipografía | Plus Jakarta Sans (Google Fonts) |
| Datos | Fetch API → API REST METUR |
| Hosting | GitHub Pages (estático, gratuito) |

---

## 📄 Licencia

MIT — úsalo, modifícalo, compártelo.
