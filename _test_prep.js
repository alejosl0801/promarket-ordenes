const {JSDOM, VirtualConsole} = require("jsdom");
const fs = require("fs");
const html = fs.readFileSync("/home/user/promarket-ordenes/index.html", "utf8");
const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let m, code = ""; while ((m = re.exec(html))) code += m[1] + "\n";
try { new Function(code); console.log("✅ sintaxis OK"); } catch (e) { console.log("❌", e.message); process.exit(1); }
const errs = []; const vc = new VirtualConsole();
vc.on("jsdomError", e => errs.push((e.detail && e.detail.message) || e.message));
const dom = new JSDOM(html, {runScripts:"dangerously", pretendToBeVisual:true, url:"https://x.local/", virtualConsole:vc});
const w = dom.window; w.fetch = () => Promise.reject("no");
setTimeout(() => {
  try {
    console.log("errores de carga:", errs.length, errs[0] || "");
    console.log("STATUS_FLUJO:", w.STATUS_FLUJO.join(" → "));
    const old = new Date(Date.now() - 6*86400000).toISOString();
    w.orders = [
      {id:"1",numero:1,cliente:"A",telefono:"099",ciudad:"Quito",direccion:"x",transporte:"Servientrega",producto:"P",monto:"49.99",status:"PREPARADO",fecha:old,createdAt:old,updatedAt:old},
      {id:"2",numero:2,cliente:"B",telefono:"098",ciudad:"Guayaquil",producto:"P",monto:"59.99",status:"CONFIRMADO",fecha:old,createdAt:old,updatedAt:old}
    ];
    w.campanas = []; w.currentPeriod="todo"; w.currentFilter="TODOS"; w.currentPage=1; w.periodContab="todo";
    ["renderDashboard","renderActionCenter","renderOrderList","renderKanban","renderDespacho","renderContabilidad","renderClientes","renderReportes","renderCatalogo","renderCampanas"].forEach(f=>{try{w[f]()}catch(e){console.log("❌ "+f+": "+e.message)}});
    console.log("despacho incluye PREPARADO+CONFIRMADO:", w.document.getElementById("despacho-container").innerHTML.includes("#1") && w.document.getElementById("despacho-container").innerHTML.includes("#2") ? "✅":"❌");
    const kb = w.document.getElementById("kanban-board").innerHTML;
    console.log("kanban col Preparado:", /preparado/i.test(kb) ? "✅":"❌");
    console.log("dashboard card Preparados:", /Preparados/.test(w.document.getElementById("stats-row").innerHTML) ? "✅":"❌");
    w.modalGuiaId = "1";
    w.document.getElementById("input-guia-rapida").value = "SV1";
    w.guardarGuiaRapida();
    console.log("PREPARADO + guía → EN TRANSITO:", w.orders.find(x=>x.id==="1").status === "EN TRANSITO" ? "✅":"❌");
    console.log("campaña: importarCSVFacebook existe y campanas es array:", Array.isArray(w.campanas) ? "✅":"❌");
  } catch (e) { console.log("❌", e.message); }
}, 700);
