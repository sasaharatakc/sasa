#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

"$SCRIPT_DIR/local_codex_env.sh"
# shellcheck disable=SC1091
source .codex-local.env
"$SCRIPT_DIR/local_codex_verify.sh"
