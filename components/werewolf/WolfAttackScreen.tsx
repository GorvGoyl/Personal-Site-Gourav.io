import { useState } from "react"
import type { GameState, GameAction } from "./types"
import { isWolf, getPlayerName } from "./types"
import { PlayerGrid } from "./PlayerGrid"

type Props = {
  state: GameState
  dispatch: (action: GameAction) => void
}

export function WolfAttackScreen({ state, dispatch }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  const alivePlayers = state.players.filter((p) => p.isAlive)
  const wolfIds = state.players.filter((p) => isWolf(p.role)).map((p) => p.id)
  const courtesanGuest = state.currentNightEvent.courtesanGuest

  function handleConfirm() {
    if (!selected) return
    dispatch({ type: "SET_WOLF_TARGET", playerId: selected })
  }

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <div className="mb-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#7b68ee]">
          Night {state.currentNight}
        </div>
        <div className="mt-1 text-xl font-bold">🐺 Wolves Attack</div>
        <div className="mt-1 text-sm text-gray-400">
          &quot;Wolves, open your eyes. Choose a victim.&quot;
        </div>
        <div className="mt-0.5 text-sm text-[#f39c12]">Tap the player they want to kill</div>
      </div>

      {state.babyWolfTransformNight === state.currentNight && state.babyWolfPlayerId && (
        <div className="mx-3 mb-4 rounded-lg border-l-[3px] border-[#f39c12] bg-[#f39c12]/10 px-3.5 py-3">
          <div className="text-xs font-semibold text-[#f39c12]">
            🐺👶 Baby Wolf Transformed!
          </div>
          <div className="mt-0.5 text-[11px] text-gray-400">
            Tap {getPlayerName(state.players, state.babyWolfPlayerId)}&apos;s shoulder before waking the wolves
          </div>
        </div>
      )}

      <PlayerGrid
        players={alivePlayers}
        selectedIds={selected ? [selected] : []}
        onSelect={(id) => setSelected(id)}
        disabledIds={wolfIds}
      />

      {courtesanGuest && (() => {
        const guest = state.players.find((p) => p.id === courtesanGuest)
        const guestIsWolf = guest && isWolf(guest.role)
        const guestName = getPlayerName(state.players, courtesanGuest)
        return (
          <div className="mx-3 mt-3 rounded-lg border-l-[3px] border-[#e94560] bg-[#e94560]/10 px-3 py-2">
            <div className="text-xs font-semibold text-[#e94560]">
              Courtesan is with: {guestName}
            </div>
            <div className="mt-0.5 text-[11px] text-gray-400">
              {guestIsWolf
                ? `${guestName} is a wolf — Courtesan will die`
                : `If wolves pick ${guestName}, no one dies`}
            </div>
          </div>
        )
      })()}

      <div className="mt-4 px-3">
        <button
          type="button"
          disabled={!selected}
          onClick={handleConfirm}
          className={`w-full rounded-xl py-3.5 text-center text-sm font-bold ${
            selected
              ? "bg-[#e94560] text-white active:bg-[#d63851]"
              : "bg-gray-800 text-gray-500"
          }`}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}
