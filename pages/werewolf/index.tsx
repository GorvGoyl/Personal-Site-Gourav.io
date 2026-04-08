import Head from "next/head"
import { useReducer, useCallback, useRef, useState, useEffect } from "react"
import { gameReducer, createInitialState } from "../../components/werewolf/gameReducer"
import { WerewolfApp } from "../../components/werewolf/WerewolfApp"
import type { GameAction, GameState } from "../../components/werewolf/types"

const STORAGE_KEY = "werewolf-game"
const MAX_HISTORY = 30

function loadSavedState(): GameState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    // Ignore corrupt data
  }
  return null
}

function saveState(state: GameState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Ignore storage errors
  }
}

export default function WerewolfPage() {
  const [state, rawDispatch] = useReducer(gameReducer, null, createInitialState)
  const [hydrated, setHydrated] = useState(false)

  // Restore saved state after hydration to avoid server/client mismatch
  useEffect(() => {
    const saved = loadSavedState()
    if (saved) {
      rawDispatch({ type: "RESTORE_STATE", state: saved })
    }
    setHydrated(true)
  }, [])

  const historyRef = useRef<GameState[]>([])
  const [historyLength, setHistoryLength] = useState(0)

  const stateRef = useRef(state)
  stateRef.current = state

  const dispatch = useCallback(
    (action: GameAction) => {
      console.log("[werewolf] action:", JSON.stringify(action, null, 2))
      console.log("[werewolf] state before:", JSON.stringify(stateRef.current, null, 2))
      if (action.type !== "NEW_GAME" && action.type !== "RESTORE_STATE") {
        const history = historyRef.current
        history.push(stateRef.current)
        if (history.length > MAX_HISTORY) history.shift()
        setHistoryLength(history.length)
      }
      if (action.type === "NEW_GAME") {
        historyRef.current = []
        setHistoryLength(0)
      }
      rawDispatch(action)
    },
    [],
  )

  const handleBack = useCallback(() => {
    const history = historyRef.current
    if (history.length === 0) return
    const prev = history.pop()!
    setHistoryLength(history.length)
    rawDispatch({ type: "RESTORE_STATE", state: prev })
  }, [])

  // Save state to localStorage after changes (skip during initial hydration)
  const prevStateRef = useRef(state)
  if (hydrated && prevStateRef.current !== state) {
    prevStateRef.current = state
    console.log("[werewolf] state after:", JSON.stringify(state, null, 2))
    if (state.currentPhase.type === "setup" && state.players.length === 0) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      saveState(state)
    }
  }

  return (
    <>
      <Head>
        <title>Werewolf GM Tracker</title>
        <meta name="description" content="Track your Werewolf game as the game master" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <div className="min-h-screen bg-[#0f0f1a] text-white">
        <WerewolfApp
          state={state}
          dispatch={dispatch}
          onBack={handleBack}
          canGoBack={historyLength > 0}
        />
      </div>
    </>
  )
}
