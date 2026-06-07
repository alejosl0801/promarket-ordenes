# Promarket Órdenes — Contexto completo del proyecto

## Quién es el usuario
- Emprendedor ecuatoriano de ecommerce
- Opera desde Quito/Ecuador
- Usa Rocket-e como panel de pedidos (capturas de pantalla → Gemini extrae datos)
- Usa Servientrega como única transportista
- Publicidad en Facebook/Instagram (Meta Ads)
- WhatsApp Business para atención al cliente

## Productos
1. **Guante Robótico de Rehabilitación**
   - Precio venta: $59.99 (unitario) / $107.98 (par)
   - Costo: $23.15
   - Envío: $7.52
   - Margen neto unitario: $29.32 (48.9%)
   - Margen neto par: $54.16 (50.2%)
   - ✅ Disponible en mano DERECHA e IZQUIERDA (actualizado Jun 2026 — antes solo había derecha)
   - También disponible en par (x2)
   - Estrategia de precio: anclar a fisioterapia ("sesión fisio $40 x 20 sesiones = $800 vs $60 guante en casa")

2. **Juego de Ollas 12 PCS**
   - Precio venta: $49.99
   - Costo: $16.50
   - Envío: $11.09 (caja grande = envío caro)
   - Margen neto: $22.40 (44.8%)
   - ⚠️ Producto de baja calidad

## Reglas críticas del negocio
- **NUNCA abrir WhatsApp automáticamente** — solo via `abrirWhatsappDesdeModal()` tras confirmación explícita del usuario
- **NO maneja stocks** — lo hace Rocket-e
- **Solo Servientrega** como transportista
- **No servicios de pago** para funcionalidades

## App: Promarket Órdenes
- **URL producción:** https://alejosl0801.github.io/promarket-ordenes/
- **Repo:** alejosl0801/promarket-ordenes
- **Rama desarrollo:** `claude/brave-thompson-iEVFw`
- **Rama producción:** `main` (GitHub Pages)
- **Versión actual:** v2.8
- **Tipo:** Single-file PWA (todo en `index.html`) — HTML + CSS + JS sin frameworks

### LocalStorage keys
- `pm_ordenes_v2` — órdenes
- `pm_catalogo_v1` — catálogo
- `pm_campanas_v1` — campañas
- `pm_marcados_v1` — números marcados (bloqueados/vigilados)
- `pm_papelera_v1` — papelera (24h retención)
- `pm_cloud_url` — URL del Apps Script
- `pm_gemini_key` — API key de Gemini

### Nube (Google Apps Script)
- URL: `https://script.google.com/macros/s/AKfycbzU6xk4-zEkaJyJTYCIDgjGbXdsWYLbGWtyX_Q7iVuKMwhtJuNCytMxU0ZQnd-FFdFC/exec`
- GET = leer datos, POST no-cors = guardar
- Es la fuente de verdad — al abrir la app carga desde la nube

### Dependencias externas (CDN)
- jsPDF 2.5.1: `https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js`
- Fuentes: IBM Plex Sans (Google Fonts)

## Estado actual de órdenes (Jun 2026)
| # | Cliente | Producto | Monto | Estado |
|---|---|---|---|---|
| 146504 | Carmen Sosa Cagua | Guante x2 | $107.98 | EN AGENCIA |
| 146271 | Alex Lara Alvarez | Guante x2 | $107.98 | EN AGENCIA |
| 144356 | Blanca Rodríguez | Guante x1 | $59.99 | EN AGENCIA |
| 146110 | Willman Zúñiga | Ollas x1 | $49.99 | EN TRÁNSITO |

- **Total pendiente de cobro:** $325.94
- **Ganancia neta pendiente:** $124.29 (después de costos + campañas)
- 1 orden ya retirada (no identificada aún en app)

## Campañas Facebook activas (Jun 2026)
### 02/06/26-CBO-GUANTE-TEST WHATSAPP
- Presupuesto: $10.33/día (duplicado el 6 jun)
- Gastado acumulado: $17.50 (1-5 jun)
- Conversaciones: 11 | Compras FB: 1
- ROAS real: ~15x (cruzado con órdenes app)
- **Anuncios activos:** AD3, AD6, AD17, AD14, AD1, AD13, AD2, AD4, AD7, AD11
- **Anuncios pausados:** AD9, AD15, AD5, AD10, AD12, AD8
- Mejores creativos: AD6 ($0.25/conv), AD17 ($0.31/conv), AD3 ($0.37/conv)
- Mayor gasto: AD14 ($9.58, 1 compra confirmada)

### 02/06/26-CBO-SET DE OLLAS-TEST WHATSAPP
- **PAUSADA** el 6 jun (margen neto demasiado bajo: $4.15/orden)
- Gastado: $18.25 | Conversaciones: 18 | Compras: 3
- CAC: $18.25 por orden = insostenible

## Análisis financiero (datos reales)
- Por cada $1 invertido en Guante → $8.27 de ganancia neta
- Por cada $1 invertido en Ollas → $1.23 de ganancia neta
- **Conclusión: escalar Guante, Ollas pausada**

## Bugs corregidos (historial técnico)
1. `selectedOrders = new Set()` estaba en línea 3104 pero `renderAll()` se llamaba en línea 1526 → tabla vacía cuando había datos en localStorage. **Fix:** mover declaración antes de `renderAll()`
2. `addProdRow` usaba `data.producto` en vez de `data.nombre` → al editar una orden, el producto no se cargaba → `getProdRows()` devolvía array vacío → falsa alerta $0.00. **Fix:** usar `data.nombre || data.producto`
3. `cargarOrdenEnForm`: `o.products || [fallback]` — array vacío es truthy → fallback nunca se usaba. **Fix:** `(o.products && o.products.length) ? o.products : [fallback]`
4. PDF producto mostraba "-": mismo bug de array vacío en `descargarPdf`. **Fix:** mapear productos con fallback a `o.producto`
5. PDF $0.00: mismo bug en `buildOrderHtml`. **Fix:** agregar `if(totalNum===0 && d.monto)` como segundo fallback

## Funcionalidades implementadas
- ✅ Extracción automática de datos desde capturas Rocket-e (Gemini API)
- ✅ PDF profesional A5 con jsPDF (sin diálogo de impresión, funciona en iOS)
- ✅ Guía clickeable → Servientrega tracking
- ✅ Papelera con 24h de retención
- ✅ Sincronización nube (Google Drive via Apps Script)
- ✅ Pull-to-refresh en móvil
- ✅ Persistencia de pestaña activa (sessionStorage)
- ✅ Campañas con métricas de Facebook (importar CSV)
- ✅ CRM de clientes con historial
- ✅ Números marcados (bloqueados/vigilados/anticipo)
- ✅ Kanban de estados
- ✅ Dashboard con KPIs
- ✅ Exportar/importar JSON

## Pendientes / próximos pasos
- [ ] Analizar chats de WhatsApp de los que NO compraron (8 de Guante, 15 de Ollas)
- [ ] Optimizar mensaje de bienvenida en WhatsApp para cerrar más ventas
- [ ] Vincular órdenes a campañas en la app (campo campaña en orden)
- [ ] Revisar AD14 vs AD3/AD6/AD17 — decidir si escalar los baratos
- [ ] Actualizar estado de la orden ya retirada a ENTREGADO en app
- [ ] Horario de agencia vacío en orden #144356 (Blanca Rodríguez)

## Cómo trabajamos
- Todos los cambios van a rama `main` directamente (GitHub Pages)
- El usuario prueba en `alejosl0801.github.io/promarket-ordenes/`
- Ctrl+Shift+R para forzar recarga y ver cambios
- El usuario comparte CSVs de Facebook, JSONs de la app y capturas para análisis
