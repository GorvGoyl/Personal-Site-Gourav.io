import { useState } from "react"
import type { GameState, GameAction } from "./types"
import { getPlayerName } from "./types"
import { PlayerGrid } from "./PlayerGrid"

type Props = {
  state: GameState
  dispatch: (action: GameAction) => void
}

export function CourtesanScreen({ state, dispatch }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  const courtesan = state.players.find((p) => p.role === "courtesan")
  const isAlive = courtesan?.isAlive ?? false
  const alivePlayers = state.players.filter((p) => p.isAlive)

  const disabledIds: string[] = []
  if (courtesan) disabledIds.push(courtesan.id)
  if (state.lastCourtesanGuest) disabledIds.push(state.lastCourtesanGuest)

  function handleConfirm() {
    if (!selected) return
    dispatch({ type: "SET_COURTESAN_GUEST", playerId: selected })
  }

  function handleSkip() {
    dispatch({ type: "SKIP_TO_NEXT_PHASE" })
  }

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <div className="mb-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#7b68ee]">
          Night {state.currentNight}
        </div>
        <div className="mt-1 text-xl font-bold">🌹 Courtesan</div>
        <div className="mt-1 text-sm text-gray-400">
          &quot;Courtesan, open your eyes. Who do you invite?&quot;
        </div>
        {isAlive ? (
          <div className="mt-0.5 text-sm text-[#f39c12]">Tap the player she invites</div>
        ) : (
          <div className="mt-2 text-sm text-gray-500">Courtesan is dead — pretend to wait, then continue</div>
        )}
      </div>

      {isAlive && (
        <>
          {state.lastCourtesanGuest && (
            <div className="mx-3 mb-3 rounded-lg border-l-[3px] border-[#f39c12] bg-[#f39c12]/10 px-3 py-2 text-xs text-[#f39c12]">
              Cannot invite {getPlayerName(state.players, state.lastCourtesanGuest)} (was last night&apos;s guest)
            </div>
          )}

          <PlayerGrid
            players={alivePlayers}
            selectedIds={selected ? [selected] : []}
            onSelect={(id) => setSelected(id)}
            disabledIds={disabledIds}
          />
        </>
      )}

      <div className="mt-4 px-3">
        {isAlive ? (
          <button
            type="button"
            disabled={!selected}
            onClick={handleConfirm}
            className={`w-full rounded-xl py-3.5 text-center text-sm font-bold ${
              selected
                ? "bg-[#7b68ee] text-white active:bg-[#6a5acd]"
                : "bg-gray-800 text-gray-500"
            }`}
          >
            Confirm
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSkip}
            className="w-full rounded-xl bg-gray-700 py-3.5 text-center text-sm font-bold text-gray-300 active:bg-gray-600"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  )
}
