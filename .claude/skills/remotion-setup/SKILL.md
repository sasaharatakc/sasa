---
name: remotion-setup
description: Install and verify a Remotion video project non-interactively (npx create-video), including the cloud-sandbox workaround for the blocked headless-browser download. Use when the user asks to install/set up Remotion, run `npx create-video@latest`, or render a Remotion still/video in this repo or a cloud session.
---

# Remotion setup

## 1. Scaffold (non-interactive)

`npx create-video@latest` opens an interactive template menu that cannot be driven in a non-interactive session. Always pass `--yes`, a template flag and a directory:

```bash
npx --yes create-video@latest --yes --hello-world my-video
```

Template flags: `--blank --hello-world --next --vercel --recorder --prompt-to-motion-graphics --render-server --electron --react-router --three --still --audiogram --music-visualization --prompt-to-video --skia --overlay --code-hike --stargazer --tiktok`. Optional: `--tailwind`. Default to `--hello-world` unless the user names another template. If the user did not give a directory, use `my-video`.

The scaffold runs `npm install` itself and writes a `.gitignore` (`node_modules`, `dist`, `out`).

## 2. Verify

```bash
cd my-video
npx remotion versions   # expect "All packages have the correct version."
npx tsc --noEmit        # expect exit 0
```

## 3. Render check (cloud sandbox)

Remotion downloads a Chrome Headless Shell from `remotion.media`. In the cloud environment that host is not in the network allowlist, so the download fails with HTTP 403 ("Host not in allowlist: remotion.media"). Use the pre-installed Playwright headless shell instead:

```bash
B=$(ls -d /opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell | head -1)
npx remotion still Logo out/test.png --browser-executable="$B"
npx remotion render --browser-executable="$B"
```

Notes:
- Use the `Logo` composition for a smoke test; `HelloWorld` may fetch remote assets that are also blocked.
- Do not run `playwright install`; the browser is already present.
- On a local machine none of this is needed: `npm run dev` / `npx remotion render` work directly.
- If a different host must be reachable, read the environment network documentation (`read_documentation` topic `environment.network`) rather than guessing.

## 4. Usage hand-off

```bash
cd my-video
npm run dev          # Remotion Studio
npx remotion render  # render a video to out/
```

Compositions live in `src/Root.tsx`; entry point is `src/index.ts`; config is `remotion.config.ts`.

## 5. Finish

Commit the scaffold on the designated branch (never commit `node_modules`/`out`), push, and open a draft PR per the session's git rules.
