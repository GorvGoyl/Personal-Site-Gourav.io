import { useState } from "react"
import type { GameState, GameAction } from "./types"
import { isWolf, getRoleDisplayName } from "./types"
import { PlayerGrid } from "./PlayerGrid"

type Props = {
  state: GameState
  dispatch: (action: GameAction) => void
}

export function SeerScreen({ state, dispatch }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)

  const seer = state.players.find((p) => p.role === "seer")
  const isAlive = seer?.isAlive ?? false
  const alivePlayers = state.players.filter((p) => p.isAlive)

  const disabledIds: string[] = []
  if (seer) disabledIds.push(seer.id)

  const checkedPlayer = selected ? state.players.find((p) => p.id === selected) : null
  const seerResult = checkedPlayer
    ? isWolf(checkedPlayer.role) && checkedPlayer.role !== "queen_wolf"
      ? "wolf"
      : "not_wolf"
    : null

  function handleReveal() {
    if (!selected) return
    dispatch({ type: "SET_SEER_CHECK", playerId: selected })
    setRevealed(true)
  }

  function handleConfirm() {
    dispatch({ type: "SKIP_TO_NEXT_PHASE" })
  }

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <div className="mb-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#7b68ee]">
          Night {state.currentNight}
        </div>
        <div className="mt-1 text-xl font-bold">👁️ {getRoleDisplayName("seer", state.roleNames)}</div>
        <div className="mt-1 text-sm text-gray-400">
          &quot;{getRoleDisplayName("seer", state.roleNames)}, open your eyes. Who do you check?&quot;
        </div>
        {!isAlive && (
          <div className="mt-2 text-sm text-gray-500">{getRoleDisplayName("seer", state.roleNames)} is dead — pretend to wait, then continue</div>
        )}
      </div>

      {isAlive && (
        <>
      <PlayerGrid
        players={alivePlayers}
        selectedIds={selected ? [selected] : []}
        onSelect={(id) => {
          if (!revealed) setSelected(id)
        }}
        disabledIds={disabledIds}
      />

      {revealed && seerResult && checkedPlayer && (
        <div
          className={`mx-3 mt-4 rounded-xl p-4 text-center ${
            seerResult === "wolf" ? "bg-[#e94560]/15" : "bg-[#2ecc71]/15"
          }`}
        >
          <div className="text-3xl">{seerResult === "wolf" ? "🐺" : "😇"}</div>
          <div
            className={`mt-1 text-base font-bold ${
              seerResult === "wolf" ? "text-[#e94560]" : "text-[#2ecc71]"
            }`}
          >
            {seerResult === "wolf" ? "Wolf!" : "Not a wolf"}
          </div>
          <div className="mt-0.5 text-xs text-gray-400">
            {checkedPlayer.name} appears to be a{" "}
            {seerResult === "wolf" ? "wolf" : "villager"}
          </div>
        </div>
      )}
        </>
      )}

      <div className="mt-4 px-3">
        {isAlive ? (
          !revealed ? (
            <button
              type="button"
              disabled={!selected}
              onClick={handleReveal}
              className={`w-full rounded-xl py-3.5 text-center text-sm font-bold ${
                selected
                  ? "bg-[#7b68ee] text-white active:bg-[#6a5acd]"
                  : "bg-gray-800 text-gray-500"
              }`}
            >
              Reveal Result
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full rounded-xl bg-[#7b68ee] py-3.5 text-center text-sm font-bold text-white active:bg-[#6a5acd]"
            >
              Confirm
            </button>
          )
        ) : (
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full rounded-xl bg-gray-700 py-3.5 text-center text-sm font-bold text-gray-300 active:bg-gray-600"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  )
}
