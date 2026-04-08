import { useState } from "react"
import type { GameState, GameAction } from "./types"
import { isWolf, getPlayerName } from "./types"
import { PlayerGrid } from "./PlayerGrid"

type Props = {
  state: GameState
  dispatch: (action: GameAction) => void
}

export function DayVoteScreen({ state, dispatch }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  const alivePlayers = state.players.filter((p) => p.isAlive)
  const selectedPlayer = selected ? state.players.find((p) => p.id === selected) : null

  function handleEliminate() {
    if (!selected) return
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
            was a {wasWolf ? (selectedPlayer.role === "queen_wolf" ? "Queen Wolf 👑🐺" : "Wolf 🐺") : "Villager"}
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

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <div className="mb-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#f39c12]">
          Day {state.currentDay}
        </div>
        <div className="mt-1 text-xl font-bold">🗳️ Village Vote</div>
        <div className="mt-1 text-sm text-gray-400">Who does the village eliminate?</div>
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
