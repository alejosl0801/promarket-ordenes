// ═══════════════════════════════════════════════════════════
//  PROMARKET ÓRDENES — Code.gs  v1.0
//  Apps Script — Backend con Google Gemini Vision (GRATIS)
// ═══════════════════════════════════════════════════════════

// La API Key se guarda en: Apps Script → Configuración ⚙️ → Propiedades del script
// Nombre: GEMINI_API_KEY  |  Valor: tu key de Google AI Studio
function getGeminiUrl() {
  var key = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");
  if (!key) throw new Error("GEMINI_API_KEY no configurada en Propiedades del script.");
  return "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + key;
}

// ── CORS ─────────────────────────────────────────────────────
function doOptions(e) {
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── RESPONDER ────────────────────────────────────────────────
function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── ROUTER GET ───────────────────────────────────────────────
function doGet(e) {
  var accion = (e.parameter || {}).accion || "";
  try {
    if (accion === "testConexion") return responder({ ok: true, msg: "Promarket Órdenes OK", version: "1.0" });
    return responder({ ok: false, msg: "Acción no reconocida: " + accion });
  } catch (err) {
    return responder({ ok: false, msg: "Error: " + err.message });
  }
}

// ── ROUTER POST ──────────────────────────────────────────────
function doPost(e) {
  var body = {};
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return responder({ ok: false, msg: "Error parseando body: " + err.message });
  }

  var accion = body.accion || "";

  try {
    if (accion === "extraer_pedido") return responder(extraerPedido(body));
    if (accion === "testConexion")   return responder({ ok: true, msg: "OK" });
    return responder({ ok: false, msg: "Acción no reconocida: " + accion });
  } catch (err) {
    return responder({ ok: false, msg: "Error en " + accion + ": " + err.message });
  }
}

// ── EXTRAER PEDIDO CON GEMINI VISION ─────────────────────────
function extraerPedido(body) {
  var imagen    = body.imagen;
  var mediaType = body.mediaType || "image/jpeg";

  if (!imagen) return { ok: false, msg: "No se recibió imagen." };

  var prompt = "Analiza esta captura de pantalla de un panel de pedidos y extrae TODOS los datos visibles. " +
    "Devuelve ÚNICAMENTE un JSON válido con esta estructura exacta (sin texto adicional, sin markdown, sin ```json):\n\n" +
    "{\"numero\":\"\",\"cliente\":\"\",\"telefono\":\"\",\"direccion\":\"\",\"ciudad\":\"\",\"provincia\":\"\",\"pais\":\"Ecuador\"," +
    "\"producto\":\"\",\"cantidad\":\"1\",\"monto\":\"\",\"pago\":\"\",\"transporte\":\"\",\"agencia\":\"\",\"nota\":\"\"}";

  var payload = {
    contents: [{
      parts: [
        {
          inline_data: {
            mime_type: mediaType,
            data: imagen
          }
        },
        {
          text: prompt
        }
      ]
    }],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 1024
    }
  };

  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(getGeminiUrl(), options);
  var code     = response.getResponseCode();
  var text     = response.getContentText();

  if (code !== 200) {
    return { ok: false, msg: "Error Gemini API (" + code + "): " + text };
  }

  var result  = JSON.parse(text);
  var content = result.candidates[0].content.parts[0].text.trim();

  // Extraer JSON aunque venga con texto extra
  var match = content.match(/\{[\s\S]*\}/);
  if (!match) return { ok: false, msg: "No se pudo parsear respuesta: " + content };

  var data = JSON.parse(match[0]);
  return { ok: true, data: data };
}
