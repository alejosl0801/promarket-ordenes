#!/bin/bash
# Hook: UserPromptSubmit — detecta "arranca" y fuerza instrucción de Read local

PROMPT="$1"
PROMPT_TRIMMED=$(echo "$PROMPT" | tr '[:upper:]' '[:lower:]' | xargs)

if [[ "$PROMPT_TRIMMED" == "arranca" ]]; then
  echo "================================================================"
  echo "INSTRUCCIÓN OBLIGATORIA — LEER AHORA:"
  echo ""
  echo "Tu PRIMERA acción debe ser llamar la herramienta Read:"
  echo "  file_path = /home/user/promarket-ordenes/CEREBRO/01_empresa.md"
  echo ""
  echo "NO uses mcp__github__, ToolSearch, list_repos, ni ninguna herramienta GitHub."
  echo "NO hagas preguntas. NO explores el repositorio."
  echo "Lee los archivos locales y genera el reporte de ventas."
  echo ""
  echo "Secuencia exacta: leer CEREBRO/01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 → 10 → 11 → 12 → todos los CLIENTES/*.md → VENTAS/aprendizajes.md → VENTAS/conversaciones.md → generar reporte."
  echo "================================================================"
fi
