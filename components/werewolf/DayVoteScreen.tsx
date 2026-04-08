import { useState, useRef, useCallback } from "react"
import type { GameState, GameAction } from "./types"
import { isWolf, getPlayerName } from "./types"
import { PlayerGrid } from "./PlayerGrid"

type Props = {
  state: GameState
  dispatch: (action: GameAction) => void
}

// Bell-like chime: sine fundamental + quiet overtones for richness
function playChime(ctx: AudioContext, freq: number, startTime: number, volume: number, duration: number) {
  const harmonics = [1, 2, 3, 5.2]
  const gains = [1, 0.4, 0.2, 0.08]
  for (let h = 0; h < harmonics.length; h++) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "sine"
    osc.frequency.value = freq * harmonics[h]
    gain.gain.setValueAtTime(volume * gains[h], startTime)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(startTime)
    osc.stop(startTime + duration)
  }
}

function playLoudWarning(ctx: AudioContext) {
  const now = ctx.currentTime
  // Two bright doorbell-style chimes (E5 → C5), repeated twice
  const pattern = [659, 523, 659, 523]
  for (let i = 0; i < pattern.length; i++) {
    playChime(ctx, pattern[i], now + i * 0.35, 0.9, 0.6)
  }
}

function playLoudEnd(ctx: AudioContext) {
  const now = ctx.currentTime
  // Urgent ascending melody: C5 → E5 → G5, repeated twice, then high C6 sustain
  const pattern = [523, 659, 784, 523, 659, 784]
  for (let i = 0; i < pattern.length; i++) {
    playChime(ctx, pattern[i], now + i * 0.2, 1.0, 0.4)
  }
  // Final sustained high chime
  playChime(ctx, 1047, now + 1.3, 1.0, 1.5)
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function DayVoteScreen({ state, dispatch }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  // Timer state
  const timerMinutes = state.timerMinutes
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [timerDone, setTimerDone] = useState(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const warningFiredRef = useRef(false)
  const endFiredRef = useRef(false)
  const totalSecondsRef = useRef(0)

  function getAudioCtx(): AudioContext {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  const startTimer = useCallback(() => {
    if (timerMinutes <= 0) return
    const total = timerMinutes * 60
    totalSecondsRef.current = total
    setTimerSeconds(total)
    setTimerRunning(true)
    setTimerDone(false)
    warningFiredRef.current = false
    endFiredRef.current = false

    // Init audio context on user gesture
    getAudioCtx()

    if (intervalRef.current) clearInterval(intervalRef.current)
    let remaining = total
    intervalRef.current = setInterval(() => {
      remaining--
      setTimerSeconds(remaining)

      // 80% elapsed = 20% remaining
      const warningAt = Math.floor(total * 0.2)
      if (remaining === warningAt && !warningFiredRef.current) {
        warningFiredRef.current = true
        const ctx = audioCtxRef.current
        if (ctx) playLoudWarning(ctx)
      }

      if (remaining <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setTimerRunning(false)
        setTimerDone(true)
        if (!endFiredRef.current) {
          endFiredRef.current = true
          const ctx = audioCtxRef.current
          if (ctx) playLoudEnd(ctx)
        }
      }
    }, 1000)
  }, [timerMinutes])

  function stopTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setTimerRunning(false)
    setTimerSeconds(0)
    setTimerDone(false)
  }

  const alivePlayers = state.players.filter((p) => p.isAlive)
  const selectedPlayer = selected ? state.players.find((p) => p.id === selected) : null

  function handleEliminate() {
    if (!selected) return
    stopTimer()
    setConfirmed(true)
    dispatch({ type: "ELIMINATE_PLAYER", playerId: selected })
  }

  function handleNextNight() {
    dispatch({ type: "START_NEXT_NIGHT" })
  }

  // After elimination, show the result
  if (confirmed && selectedPlayer) {
    const wasWolf = isWolf(selectedPlayer.role)
    return (
      <div className="mx-auto max-w-md px-4 py-6">
        <div className="mb-6 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#f39c12]">
            Day {state.currentDay}
          </div>
          <div className="mt-1 text-xl font-bold">🗳️ Elimination Result</div>
        </div>

        <div
          className={`mx-3 mb-4 rounded-xl p-6 text-center ${
            wasWolf ? "bg-[#e94560]/15" : "bg-[#2ecc71]/15"
          }`}
        >
          <div className="text-3xl">{wasWolf ? "🐺" : "😇"}</div>
          <div className="mt-2 text-lg font-bold text-white">{selectedPlayer.name}</div>
          <div
            className={`mt-1 text-sm font-semibold ${
              wasWolf ? "text-[#e94560]" : "text-[#2ecc71]"
            }`}
          >
            was a {wasWolf ? "Wolf 🐺" : "Villager"}
          </div>
        </div>

        {state.currentPhase.type === "game_over" ? null : (
          <div className="px-3">
            <button
              type="button"
              onClick={handleNextNight}
              className="w-full rounded-xl bg-[#7b68ee] py-3.5 text-center text-sm font-bold text-white active:bg-[#6a5acd]"
            >
              Start Night {state.currentNight + 1} →
            </button>
          </div>
        )}
      </div>
    )
  }

  const timerProgress = totalSecondsRef.current > 0
    ? 1 - timerSeconds / totalSecondsRef.current
    : 0
  const isWarningZone = timerRunning && timerProgress >= 0.8

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <div className="mb-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#f39c12]">
          Day {state.currentDay}
        </div>
        <div className="mt-1 text-xl font-bold">🗳️ Village Vote</div>
        <div className="mt-1 text-sm text-gray-400">Who does the village eliminate?</div>
      </div>

      {/* Discussion Timer */}
      <div className={`mx-3 mb-4 rounded-lg p-3 ${
        timerDone
          ? "bg-[#e94560]/20 border border-[#e94560]/40"
          : isWarningZone
            ? "bg-[#f39c12]/15 border border-[#f39c12]/30"
            : "bg-[#1a1a2e]"
      }`}>
        {!timerRunning && !timerDone ? (
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-gray-400">Discussion Timer</div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => dispatch({ type: "SET_TIMER_MINUTES", minutes: Math.max(1, timerMinutes - 1) })}
                className="flex h-7 w-7 items-center justify-center rounded bg-[#2a2a3e] text-sm font-bold text-white active:bg-[#3a3a4e]"
              >
                -
              </button>
              <div className="min-w-[2.5rem] text-center text-sm font-bold text-white">
                {timerMinutes} min
              </div>
              <button
                type="button"
                onClick={() => dispatch({ type: "SET_TIMER_MINUTES", minutes: Math.min(15, timerMinutes + 1) })}
                className="flex h-7 w-7 items-center justify-center rounded bg-[#2a2a3e] text-sm font-bold text-white active:bg-[#3a3a4e]"
              >
                +
              </button>
              <button
                type="button"
                onClick={startTimer}
                className="ml-1 rounded-lg bg-[#7b68ee] px-3 py-1.5 text-xs font-semibold text-white active:bg-[#6a5acd]"
              >
                Start
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className={`text-2xl font-bold tabular-nums ${
              timerDone
                ? "text-[#e94560]"
                : isWarningZone
                  ? "text-[#f39c12]"
                  : "text-white"
            }`}>
              {timerDone ? "0:00" : formatTime(timerSeconds)}
            </div>
            <div className="flex items-center gap-2">
              {timerDone && (
                <div className="text-xs font-semibold text-[#e94560]">Time&apos;s up!</div>
              )}
              {isWarningZone && !timerDone && (
                <div className="text-xs font-semibold text-[#f39c12]">Hurry up!</div>
              )}
              <button
                type="button"
                onClick={stopTimer}
                className="rounded-lg border border-gray-600 px-3 py-1.5 text-xs font-semibold text-gray-400 active:bg-[#2a2a3e]"
              >
                Stop
              </button>
            </div>
          </div>
        )}
      </div>

      <PlayerGrid
        players={alivePlayers}
        selectedIds={selected ? [selected] : []}
        onSelect={(id) => setSelected(id)}
      />

      {selected && (
        <div className="mx-3 mt-3 rounded-lg bg-[#f39c12]/10 p-2.5 text-center">
          <div className="text-sm text-[#f39c12]">
            {getPlayerName(state.players, selected)} is voted out
          </div>
          <div className="mt-0.5 text-[11px] text-gray-400">
            Role will be revealed on confirmation
          </div>
        </div>
      )}

      <div className="mt-4 px-3">
        <button
          type="button"
          disabled={!selected}
          onClick={handleEliminate}
          className={`w-full rounded-xl py-3.5 text-center text-sm font-bold ${
            selected
              ? "bg-[#f39c12] text-black active:bg-[#e08e0b]"
              : "bg-gray-800 text-gray-500"
          }`}
        >
          Confirm Elimination
        </button>
      </div>
    </div>
  )
}
