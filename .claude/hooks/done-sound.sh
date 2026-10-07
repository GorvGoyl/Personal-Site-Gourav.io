#!/usr/bin/env bash
# Stop hook (async) — play the "answer finished" chime only once Claude is really done.
#
# A turn also ends while background work that will wake Claude up again is still running
# (a Workflow, background agents, a background command or Monitor it is waiting on, an MCP
# task or a cloud session — Claude Code lists these in the Stop input's background_tasks), so
# the chime waits for the final turn instead. Background shells that never end on their own
# (dev servers, watchers, tail -f) and internal housekeeping tasks don't hold it back.
# Uses only macOS built-ins: osascript (JavaScript) to read the JSON, afplay for the sound.
set -u
input=$(cat 2>/dev/null || true)

pending=$(osascript -l JavaScript -e '
function run([raw]) {
  const longRunning = /(^|[^A-Za-z0-9_])(dev|serve|server|start|watch|preview|storybook|vite|nodemon|uvicorn|gunicorn|runserver)([^A-Za-z0-9_]|$)|compose +up|tail[^|;&]* -[fF]/i;
  const wakesClaude = ["workflow", "subagent", "shell", "MCP task", "cloud session"];
  return (JSON.parse(raw).background_tasks || []).filter((task) =>
    wakesClaude.includes(task.type) && !(task.type === "shell" && longRunning.test(task.command || ""))
  ).length;
}' "$input" 2>/dev/null)
case "$pending" in ''|*[!0-9]*) pending=0 ;; esac
[ "$pending" -eq 0 ] || exit 0

exec afplay -v 0.5 "$(dirname "$0")/../sounds/Glass.aiff"
