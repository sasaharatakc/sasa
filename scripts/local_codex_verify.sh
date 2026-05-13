#!/usr/bin/env bash
set -euo pipefail

warn=0
for bin in curl python3 git; do
  if ! command -v "$bin" >/dev/null 2>&1; then
    echo "[FAIL] missing dependency: $bin" >&2
    exit 1
  fi
done

echo "[OK] required binaries installed"

BASE_URL="${CODEX_LOCAL_BASE_URL:-${ANTHROPIC_BASE_URL:-${OPENAI_BASE_URL:-}}}"
if [[ -z "$BASE_URL" ]]; then
  echo "[FAIL] base URL not set. Run: source .codex-local.env" >&2
  exit 1
fi

if [[ "$BASE_URL" != *"127.0.0.1"* && "$BASE_URL" != *"localhost"* ]]; then
  echo "[FAIL] base URL must be localhost/127.0.0.1: $BASE_URL" >&2
  exit 1
fi

echo "[OK] local base URL: $BASE_URL"

if [[ "${ANTHROPIC_BASE_URL:-}" != "" && "${ANTHROPIC_BASE_URL}" != "$BASE_URL" ]]; then
  echo "[FAIL] ANTHROPIC_BASE_URL is not unified: ${ANTHROPIC_BASE_URL}" >&2
  exit 1
fi
if [[ "${OPENAI_BASE_URL:-}" != "" && "${OPENAI_BASE_URL}" != "$BASE_URL" ]]; then
  echo "[FAIL] OPENAI_BASE_URL is not unified: ${OPENAI_BASE_URL}" >&2
  exit 1
fi
if [[ "${OPENAI_API_BASE:-}" != "" && "${OPENAI_API_BASE}" != "$BASE_URL" ]]; then
  echo "[FAIL] OPENAI_API_BASE is not unified: ${OPENAI_API_BASE}" >&2
  exit 1
fi

echo "[OK] endpoint variables are unified"

for path in /v1/models /models; do
  code="$(curl -sS -o /tmp/codex_local_probe.json -w "%{http_code}" "$BASE_URL$path" || true)"
  if [[ "$code" =~ ^2 ]]; then
    echo "[OK] endpoint reachable: $BASE_URL$path ($code)"
    exit 0
  fi
  echo "[WARN] probe failed: $BASE_URL$path ($code)"
  warn=1
done

if [[ $warn -eq 1 ]]; then
  echo "[WARN] local server is not reachable yet. Start server and retry."
  exit 2
fi
