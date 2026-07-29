#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
PYTHON_BIN="${VIBECHECK_PYTHON:-}"

if [ -z "$PYTHON_BIN" ]; then
  if [ -x "$ROOT_DIR/.venv/bin/python" ]; then
    PYTHON_BIN="$ROOT_DIR/.venv/bin/python"
  elif command -v python3 >/dev/null 2>&1; then
    PYTHON_BIN="$(command -v python3)"
  else
    echo "Python was not found. Install Python 3, then try again."
    exit 1
  fi
fi

if ! "$PYTHON_BIN" -c "import django" >/dev/null 2>&1; then
  echo "Django is not installed for: $PYTHON_BIN"
  echo
  echo "Run these from the project root:"
  echo "  python3 -m venv .venv"
  echo "  source .venv/bin/activate"
  echo "  pip install -r backend/requirements.txt"
  echo
  echo "Then try the npm command again."
  exit 1
fi

if [ "$#" -eq 0 ]; then
  echo "No Django command was provided."
  echo "Example: bash scripts/django.sh runserver 8000"
  exit 1
fi

cd "$BACKEND_DIR"
exec "$PYTHON_BIN" manage.py "$@"
