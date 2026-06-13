# FLUJOS DE VENTA — PROMARKET ECUADOR
## Actualizado: 11 de junio 2026

---

## FLUJO GUANTE — VENTA NUEVA

```
CLIENTE ESCRIBE
      ↓
Bot automático envía bienvenida con precio $59.99
      ↓
¿Ya dijo "quiero realizar mi pedido"?
  SÍ → precio $59.99 + "¿de qué ciudad nos escribe?" — NO preguntar para quién
  NO → "¿el guante es para usted o para un familiar?"
      ↓
Para usted → cierre funcional (niveles, progreso, desde casa)
Para familiar → preguntar condición médica → cierre según caso
      ↓
Da ciudad → "Déjeme buscar la agencia más cercana 😊
             ¿me puede dar una referencia de su dirección o barrio en [ciudad]?"
      ↓
Da barrio → buscar agencia exacta → confirmar:
"Ya busqué — la agencia [NOMBRE EXACTO] está habilitada ✅
Su kit incluye: guante robótico + guante espejo + controlador de potencia + pelota de rehabilitación 💪
Llega en 2-3 días hábiles 😊
¿Me ayuda con sus datos para generarle la orden?
📌 Nombre completo
📌 Cédula
📌 Número celular
📌 Dirección de referencia
📌 Guante izquierdo o derecho"
      ↓
¿Tiene dudas antes de dar datos?
  ├── ¿Una o el par? → /par_guante
  ├── Precio irreal → /duda_precio_guante
  ├── ¿Funciona de verdad? → marca Syrobo + cero riesgo al retirar
  ├── ¿Puedo revisar antes? → "paga al retirar — si no convence no lo retira ✅"
  ├── ¿En qué colores? → "solo azul 😊"
  ├── ¿Qué incluye? → "guante + guante espejo + controlador de potencia + pelota"
  ├── ¿Qué talla? → "talla estándar ajustable a todo tipo de manos 😊"
  └── Lo pienso → /lopienso
      ↓
Da los 5 datos → confirmar → generar orden → enviar PDF
      ↓
POST-VENTA (ver flujo abajo)
```

---

## FLUJO DE SEGUIMIENTO — LEADS QUE NO RESPONDIERON NADA

```
Cliente vio el precio y no respondió NADA
      ↓
D1 — 2 horas después del último mensaje sin respuesta:
"¿le pareció bien el precio o tiene alguna duda que pueda resolver? 😊"
      ↓
¿Respondió?
  SÍ → continuar conversación desde donde quedó
  NO ↓
      ↓
D2 — Al día siguiente (si sigue sin responder):
"Hola! 😊 Camila de ProMarket — hoy tengo el guante de rehabilitación
por $49.99 con envío incluido, precio especial de hoy ✅ ¿se anima?"
      ↓
¿Respondió?
  SÍ → continuar conversación
  NO ↓
      ↓
D3 — Día siguiente al D2:
"¿le pareció bien la promoción del guante? 😊 aún está disponible para usted"
      ↓
¿Respondió?
  SÍ → continuar conversación
  NO ↓
      ↓
D4 — Día siguiente al D3 (ÚLTIMO MENSAJE):
"Hola! cómo le va 😊 noto que aún no me ha dado una respuesta —
¿qué opina sobre el guante? estamos para ayudarle 🙏"
      ↓
¿Respondió?
  SÍ → continuar conversación
  NO → MUERE EL CHAT — no se escribe más
```

**REGLA:** Este flujo es SOLO para quienes no respondieron nada.
Para quienes sí respondieron pero se cortó la conversación → retomar desde lo último hablado.

---

## FLUJO DE SEGUIMIENTO — LEADS QUE SÍ RESPONDIERON (se cortó la conversación)

```
Cliente respondió pero dejó de escribir en algún punto del flujo
      ↓
¿En qué punto se cortó?
  ├── Dio precio, no dio ciudad → preguntar ciudad + urgencia del domingo
  ├── Dio ciudad, no dio barrio → preguntar barrio para buscar agencia
  ├── Dio barrio, no dio datos → recordar agencia + pedir datos
  ├── Dijo "lo pienso" → /lopienso + urgencia
  ├── Mandó audio ignorado → "escuché! 😊 [responder al audio]"
  └── Dijo "ya le aviso" → esperar 24h → luego D2 con promo $49.99
      ↓
Responder desde ese punto exacto — NO empezar de cero
```

---

## FLUJO POST-VENTA — PEDIDO CONFIRMADO

```
Cliente dio los 5 datos → orden generada → PDF enviado
      ↓
Mismo momento:
"Estimad@, adjunto su orden de entrega 📄
El Servientrega le avisa cuando llega — dos días aproximadamente.
Tiene 4 días para retirarlo o le generan un par de centavos adicionales
por cada día de demora. Así que no se descuide, porfa 🙏"
      ↓
Día siguiente (empaquetando):
"Buen día! su pedido ya está preparado y hoy será enviado a Servientrega 😊
Tiene 4 días para retirarlo desde que llegue a la agencia 📦"
      ↓
Cuando Servientrega autoriza (guía disponible):
"Su pedido ya está en tránsito 🚚 aquí su guía de seguimiento: [NÚMERO DE GUÍA]
Le acompañaremos en todo el proceso 😊"
      ↓
Cuando llega a la agencia:
DÍA 1 (UN solo mensaje — mañana o tarde):
"Buenos días! su pedido ya llegó a la agencia Servientrega 🎉 recuerde que tiene 4 días para retirarlo 😊"
      ↓
DÍA 3 (si no confirma retiro — UN solo mensaje):
"Hola! 😊 su pedido sigue en la agencia — hoy es el tercer día, tiene hasta mañana sin cargo adicional"
      ↓
DÍA 4 URGENTE (si no retira — UN solo mensaje):
"Hola! hoy es el último día para retirar sin cargo adicional 📦 ¿logró pasar?"
      ↓
⚠️ REGLA: UN SOLO MENSAJE POR DÍA — nunca MAÑANA + NOCHE el mismo día (viola la regla de 24h entre contactos)
NO escribir en días 1-2 si el cliente ya confirmó que irá
      ↓
Cliente confirma que retiró → "Un gusto haberle ayudado 🙌 que le vaya muy bien!"
→ CONVERSACIÓN TERMINADA
```

**REGLA POST-VENTA:**
- NO pedir testimonio
- NO pedir foto
- NO preguntar Facebook/Instagram
- Una vez retirado → conversación cerrada

---

## FLUJO ESPECIAL — CLIENTE PREGUNTA SOBRE EL PRODUCTO SIN INTENCIÓN CLARA

```
Cliente hace pregunta puntual (color, talla, condición médica, etc.)
      ↓
Responder brevemente la pregunta
      ↓
"¿se anima a probarlo? paga al retirar ✅"
      ↓
SÍ → pedir ciudad → buscar agencia → datos → orden
NO / no responde → entra al flujo de seguimiento D1 (2h después)
```
NUNCA saltar a pedir ciudad antes de confirmar interés

---

## REGLAS GENERALES DE TODOS LOS FLUJOS

- **Camila es la ÚNICA vendedora** — atiende nuevos e historial
- **NUNCA inventar** — si no sabe algo, verificar antes de responder
- **Tono médico** — enfocarse en el problema del cliente y la solución terapéutica
- **Agencia: siempre [NOMBRE EXACTO] entre corchetes** para que el operador lo reemplace
- **5 datos obligatorios** — nunca generar orden sin todos
- **Colombia: no trabajamos** — si escribe desde Colombia, no hay cobertura
