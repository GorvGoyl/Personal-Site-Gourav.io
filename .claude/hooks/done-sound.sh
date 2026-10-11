#!/usr/bin/env bash
# Stop hook (async) — play the "answer finished" chime only once Claude is really done.
#
# A turn also ends while background work that will wake Claude up again is still running
# (a Workflow, background agents, a background command or Monitor it is waiting on, an MCP
# task or a cloud session — Claude Code lists these in the Stop input's background_tasks, a
# Monitor as a shell), or when that work finished just as the turn ended and Claude picks
# straight back up to read it, so the chime waits for the final turn instead. Background
# shells that never end on their own (dev servers, emulators, watchers, tail -f) and internal
# housekeeping tasks don't hold it back.
# Uses only macOS built-ins: osascript (JavaScript) to read the JSON, afplay for the sound.
set -u
input=$(cat 2>/dev/null || true)

# Note where the transcript ends right away, so a message Claude picks up later stands out.
transcript=$(osascript -l JavaScript -e 'function run([raw]) { return JSON.parse(raw).transcript_path || ""; }' "$input" 2>/dev/null)
transcript_size=$(stat -f %z "$transcript" 2>/dev/null || true)

pending=$(osascript -l JavaScript -e '
function run([raw]) {
  // Shell commands that never end on their own, matched as whole commands rather than stray
  // words, so /dev/null, START=$(date …), a test path or `gh pr checks --watch` (which does end)
  // never make a one-off job look like a server.
  const neverEnding = [
    // package scripts: pnpm dev, npm run start:prod, yarn test:watch, npx vite (not vite build)
    /\b(npm|pnpm|yarn|bun|npx|pnpx|bunx)\s([^|;&\n]*\s)?(run\s+)?([\w-]+:)?(dev|start|serve|preview|watch|storybook|vite(?!\s+build))(:[\w:-]+)?(?![\w:.\/-])/,
    // framework dev servers: next dev, vercel dev, expo start, ng serve, hugo server
    /\b(next|vite|nuxi?|astro|remix|vercel|wrangler|netlify|expo|react-native|ng|nx|turbo|gatsby|hugo|jekyll|mkdocs|docusaurus|webpack|parcel|eleventy)\s+(run\s+)?(dev|start|serve|server|preview|develop)\b|\bfirebase\s+emulators:start\b/,
    // other servers, tunnels and file watchers
    /\bhttp\.server\b|\bmanage\.py\s+runserver\b|\b(uvicorn|gunicorn|hypercorn|nodemon|watchexec|fswatch|ngrok|cloudflared)\b|\b(flask|streamlit)\s+run\b|\brails\s+s(erver)?\b|\bphp\s+(-S|artisan\s+serve)\b|\bstripe\s+listen\b/,
    // a script named like a server: node fixtures/sse-server.mjs, python3 tool/serve_web_build.py
    /\b(node|bun|deno|tsx|ts-node|python3?|ruby)\s[^|;&\n]*(\b|_)(server|serve|dev|watch)[\w-]*\.(m?[jt]s|c[jt]s|py|rb)\b/,
    // flutter run, Android emulators, live log streams
    /\bflutter\s+(run|attach)\b|\bemulator\s[^|;&\n]*-avd\b|\badb\s(-s\s+\S+\s+)?logcat\b(?![^|;&\n]*\s-[dc]\b)|\blog\s+stream\b/,
    // following a file, compose up in the foreground, watch modes
    /\btail\s([^|;&\n]*\s)?(-[A-Za-z0-9]*[fF]|--follow\b)|\bcompose\s+up\b(?![^|;&\n]*\s(-d|--detach)\b)|\b(tsc|vitest|jest|webpack|rollup|esbuild|tailwindcss|sass|node|bun|deno)\b[^|;&\n]*\s--watch(All)?\b/,
  ];
  const wakesClaude = ["workflow", "subagent", "shell", "MCP task", "cloud session"];
  return (JSON.parse(raw).background_tasks || []).filter((task) =>
    wakesClaude.includes(task.type) && !(task.type === "shell" && neverEnding.some((re) => re.test(task.command || "")))
  ).length;
}' "$input" 2>/dev/null)
case "$pending" in ''|*[!0-9]*) pending=0 ;; esac
[ "$pending" -eq 0 ] || exit 0

# Give Claude a moment: a message landing now (a task result, a queued prompt) means it's going on.
if [ -n "$transcript_size" ]; then
  sleep 3
  resumed=$(tail -c +"$((transcript_size + 1))" "$transcript" 2>/dev/null | osascript -l JavaScript -e '
ObjC.import("Foundation");
function run() {
  const data = $.NSFileHandle.fileHandleWithStandardInput.readDataToEndOfFile;
  const text = $.NSString.alloc.initWithDataEncoding(data, $.NSISOLatin1StringEncoding).js || "";
  return text.split("\n").filter((line) => {
    try {
      const entry = JSON.parse(line);
      return !entry.isSidechain && (entry.type === "user" || (entry.type === "queue-operation" && entry.operation === "enqueue"));
    } catch (e) {
      return false;
    }
  }).length;
}' 2>/dev/null)
  case "$resumed" in ''|*[!0-9]*) resumed=0 ;; esac
  [ "$resumed" -eq 0 ] || exit 0
fi

exec afplay -v 0.5 "$(dirname "$0")/../sounds/Glass.aiff"
