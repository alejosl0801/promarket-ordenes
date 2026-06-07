/***********************************************************************
 *  PROMARKET — Respaldo en la nube (Google Apps Script + Drive)
 *  ---------------------------------------------------------------
 *  Guarda los datos de tu app en un archivo privado de TU Google Drive.
 *  Tus datos NO quedan públicos: solo viven en tu cuenta de Google.
 *
 *  CÓMO USARLO (una sola vez):
 *   1. Entra a  https://script.google.com  →  "Nuevo proyecto"
 *   2. Borra todo lo que aparezca y pega TODO este código.
 *   3. Arriba a la derecha:  "Implementar"  →  "Nueva implementación"
 *   4. Tipo:  "Aplicación web".
 *        - Ejecutar como:  Yo (tu correo)
 *        - Quién tiene acceso:  Cualquier usuario
 *   5. "Implementar"  →  autoriza con tu cuenta (acepta los permisos).
 *   6. Copia la "URL de la aplicación web" (termina en /exec).
 *   7. En tu app Promarket:  botón  ☁️ Nube  →  pega esa URL  →  Conectar.
 *
 *  Tus 2 pedidos recuperados ya vienen incluidos abajo (SEED), así que
 *  aparecerán solos la primera vez. Después se actualiza solo.
 ***********************************************************************/

var FILE_NAME = 'promarket_data.json';

function doGet(e) {
  var output = ContentService
    .createTextOutput(leerDatos())
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}

function doPost(e) {
  try {
    var contenido = (e && e.postData && e.postData.contents) ? e.postData.contents : '';
    if (contenido) escribirDatos(contenido);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/* ── Almacenamiento en un archivo de tu Drive ── */
function archivo() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('FILE_ID');
  if (id) {
    try { return DriveApp.getFileById(id); } catch (e) {}
  }
  // No existe: lo creamos con los datos recuperados (SEED).
  var f = DriveApp.createFile(FILE_NAME, SEED, 'application/json');
  props.setProperty('FILE_ID', f.getId());
  return f;
}

function leerDatos() {
  return archivo().getBlob().getDataAsString();
}

function escribirDatos(texto) {
  archivo().setContent(texto);
}

/* ── Datos recuperados (tus 2 productos + 2 pedidos reales) ── */
var SEED = JSON.stringify({
  "ordenes": [
    { "id":"ord_144356","numero":"144356","fecha":"2026-06-02","status":"CONFIRMADO","guia":"",
      "products":[{"nombre":"Guante Robótico de Rehabilitación","cantidad":"1","precio":"59.99","talla":"","lado":""}],
      "producto":"Guante Robótico de Rehabilitación x1","nota":"",
      "cliente":"Blanca Rodríguez","telefono":"0981754740","direccion":"Av. Martha Bucaram S43-134 y S 43 C",
      "ciudad":"Quito","provincia":"Pichincha","pais":"Ecuador","transporte":"Servientrega","pago":"Contraentrega",
      "monto":"$59.99","entrega":"agencia","agencia":"QUITO_MARTHA BUCARAM",
      "createdAt":"2026-06-02T17:02:00.000Z","updatedAt":"2026-06-02T17:03:17.000Z","borrador":false,
      "historial":[{"accion":"Pedido creado","fecha":"2026-06-02T17:02:00.000Z"},{"accion":"Confirmado","fecha":"2026-06-02T17:03:17.000Z"}] },
    { "id":"ord_146110","numero":"146110","fecha":"2026-06-03","status":"CONFIRMADO","guia":"",
      "products":[{"nombre":"Juego de Ollas 12 PCS","cantidad":"1","precio":"49.99","talla":"","lado":""}],
      "producto":"Juego de Ollas 12 PCS x1","nota":"Pedido con CAJA (logística mayor)",
      "cliente":"Willman Zúñiga Zambrano","telefono":"0998235068","direccion":"Calle S/N y Los Ríos",
      "ciudad":"Puyo","provincia":"Pastaza","pais":"Ecuador","transporte":"Servientrega","pago":"Contraentrega",
      "monto":"$49.99","entrega":"agencia","agencia":"PUYO_CENTRO LOGISTICO",
      "createdAt":"2026-06-03T17:16:36.000Z","updatedAt":"2026-06-03T17:16:59.000Z","borrador":false,
      "historial":[{"accion":"Pedido creado","fecha":"2026-06-03T17:16:36.000Z"},{"accion":"Confirmado","fecha":"2026-06-03T17:16:59.000Z"}] }
  ],
  "catalogo": [
    { "id":"p_guante","nombre":"Guante Robótico de Rehabilitación","ref":"","precio":59.99,"costo":23.15,
      "fulfillment":0,"envio":7.52,"peso":0,"ico":"🧤",
      "desc":"Guante robótico de rehabilitación para terapia de mano.",
      "ficha":"fichas/GuanteRobot_FichaTecnica.pdf","activo":1,"stock":{"S":0,"M":0,"L":0,"XL":0} },
    { "id":"p_olla","nombre":"Juego de Ollas 12 PCS","ref":"","precio":49.99,"costo":16.50,
      "fulfillment":0,"envio":11.09,"peso":0,"ico":"🍳",
      "desc":"Set de ollas de acero inoxidable, 12 piezas. Logística con caja.",
      "ficha":"fichas/OllasInox_FichaTecnica.pdf","activo":1,"stock":{"S":0,"M":0,"L":0,"XL":0} }
  ],
  "campanas": [],
  "marcados": [],
  "exportado": "2026-06-03T22:30:00.000Z"
});
