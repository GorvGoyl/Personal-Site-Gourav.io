import { useState } from "react"
import type { GameState, GameAction } from "./types"

type Props = {
  state: GameState
  dispatch: (action: GameAction) => void
}

export function SetupScreen({ state, dispatch }: Props) {
  const [name, setName] = useState("")

  function handleAdd() {
    const trimmed = name.trim()
    if (!trimmed) return
    dispatch({ type: "ADD_PLAYER", name: trimmed })
    setName("")
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleAdd()
  }

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <div className="mb-6 text-center">
        <div className="text-2xl font-bold">🐺 Werewolf</div>
        <div className="mt-1 text-sm text-gray-400">Enter player names</div>
      </div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Player name..."
          className="flex-1 rounded-lg border border-gray-700 bg-[#1a1a2e] px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#7b68ee]"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-lg bg-[#7b68ee] px-4 py-2.5 text-sm font-semibold text-white active:bg-[#6a5acd]"
        >
          Add
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-1.5">
        {state.players.map((player, i) => (
          <div
            key={player.id}
            className="flex items-center justify-between rounded-lg bg-[#1a1a2e] px-3.5 py-2.5 text-sm text-white"
          >
            <span>
              {i + 1}. {player.name}
            </span>
            <button
              type="button"
              onClick={() => dispatch({ type: "REMOVE_PLAYER", id: player.id })}
              className="text-lg text-gray-500 active:text-red-400"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {state.players.length > 0 && (
        <div className="mb-2 text-center text-xs text-gray-500">
          {state.players.length} player{state.players.length !== 1 && "s"}
        </div>
      )}

      <button
        type="button"
        disabled={state.players.length < 5}
        onClick={() => dispatch({ type: "START_NIGHT_1" })}
        className={`w-full rounded-xl py-3.5 text-center text-sm font-bold ${
          state.players.length >= 5
            ? "bg-[#e94560] text-white active:bg-[#d63851]"
            : "bg-gray-800 text-gray-500"
        }`}
      >
        Start Night 1 →
      </button>
      {state.players.length < 5 && state.players.length > 0 && (
        <div className="mt-2 text-center text-xs text-gray-500">
          Need at least 5 players
        </div>
      )}
    </div>
  )
}
