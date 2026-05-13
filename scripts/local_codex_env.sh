#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="${1:-.codex-local.env}"
BASE_URL="${CODEX_LOCAL_BASE_URL:-http://127.0.0.1:11434}"
API_KEY="${CODEX_LOCAL_API_KEY:-local-dev-key}"

cat > "$ENV_FILE" <<ENVEOF
# Unified local endpoint settings for Codex / Claude Code-like workflows
export CODEX_LOCAL_BASE_URL="$BASE_URL"
export CODEX_LOCAL_API_KEY="$API_KEY"

# Anthropic-compatible
export ANTHROPIC_BASE_URL="$BASE_URL"
export ANTHROPIC_API_KEY="$API_KEY"

# OpenAI-compatible
export OPENAI_BASE_URL="$BASE_URL"
export OPENAI_API_KEY="$API_KEY"

# Legacy aliases (some tools read these names)
export OPENAI_API_BASE="$BASE_URL"

# Optional traffic reduction flag
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
ENVEOF

echo "Created $ENV_FILE"
echo "Run: source $ENV_FILE"
