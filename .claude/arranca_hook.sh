#!/bin/bash
# UserPromptSubmit hook — detecta "arranca" y fuerza instrucción de Read local
# El prompt llega por stdin como JSON: {"prompt": "...", "session_id": "..."}

INPUT=$(cat)

# Extraer el prompt del JSON (con python3 como primaria, fallback a grep)
PROMPT=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    print(data.get('prompt', '').strip().lower())
except:
    pass
" 2>/dev/null)

# Fallback si python3 falla
if [ -z "$PROMPT" ]; then
    PROMPT=$(echo "$INPUT" | tr '[:upper:]' '[:lower:]' | xargs)
fi

if [[ "$PROMPT" == "arranca" ]]; then
    cat <<'INSTRUCCION'
================================================================
INSTRUCCIÓN OBLIGATORIA — ejecutar ANTES de cualquier otra acción:

Tu PRIMERA llamada de herramienta DEBE ser:
  Read(file_path="/home/user/promarket-ordenes/CEREBRO/01_empresa.md")

ESTRICTAMENTE PROHIBIDO:
  - mcp__github__ (ninguna herramienta GitHub)
  - ToolSearch (no cargar herramientas GitHub)
  - list_repos, list_issues, list_pull_requests
  - Preguntar "¿en qué trabajamos?" o similares
  - Explorar el repositorio como si fuera código

Este repositorio NO es software — es un sistema de ventas WhatsApp.
Los archivos están en /home/user/promarket-ordenes/ — usar Read local.

Secuencia: leer CEREBRO/01→02→03→04→05→06→07→08→09→10→11→12 +
todos CLIENTES/*.md + VENTAS/aprendizajes.md + VENTAS/conversaciones.md
→ generar reporte completo de ventas (10 fases de CLAUDE.md)
================================================================
INSTRUCCION
fi
