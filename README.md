# Codex Local Check (Unified)

「claude code / claud cord みたいにローカルで確認」を**1つの統一フロー**で実行できます。

## 使い方（統一）

```bash
bash scripts/local_codex_check.sh
```

この1コマンドで以下を行います。
1. `.codex-local.env` を生成
2. 環境変数を読み込み
3. ローカル疎通を検証

## 分割実行（必要な場合）

```bash
bash scripts/local_codex_env.sh
source .codex-local.env
bash scripts/local_codex_verify.sh
```

## 統一される環境変数

- `CODEX_LOCAL_BASE_URL`
- `ANTHROPIC_BASE_URL`
- `OPENAI_BASE_URL`
- `OPENAI_API_BASE`

すべて同じURL（既定: `http://127.0.0.1:11434`）に揃えます。

## 補足

- `scripts/local_codex_verify.sh` は `/v1/models` と `/models` を順番に確認します。
- サーバー未起動時は warning（終了コード2）になります。
