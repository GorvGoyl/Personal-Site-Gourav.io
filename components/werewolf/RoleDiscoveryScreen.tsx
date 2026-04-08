import { useState } from "react"
import type { GameState, GameAction } from "./types"
import { ROLE_DISCOVERY_STEPS, isWolf } from "./types"
import { PlayerGrid } from "./PlayerGrid"

type Props = {
  state: GameState
  dispatch: (action: GameAction) => void
  step: number
}

export function RoleDiscoveryScreen({ state, dispatch, step }: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [seerTarget, setSeerTarget] = useState<string | null>(null)
  const [seerRevealed, setSeerRevealed] = useState(false)

  const isSeerCheckStep = step === 5

  // Steps 0-4: role assignment
  if (!isSeerCheckStep) {
    const stepInfo = ROLE_DISCOVERY_STEPS[step]
    const assignedIds = state.players.filter((p) => p.role !== null).map((p) => p.id)

    function handleSelect(id: string) {
      if (stepInfo.multiSelect) {
        setSelectedIds((prev) =>
          prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        )
      } else {
        setSelectedIds([id])
      }
    }

    function handleConfirm() {
      if (selectedIds.length === 0) return

      if (stepInfo.multiSelect) {
        dispatch({ type: "ASSIGN_WOLVES", playerIds: selectedIds })
      } else {
        dispatch({ type: "ASSIGN_ROLE", playerId: selectedIds[0], role: stepInfo.role })
      }

      setSelectedIds([])
      dispatch({ type: "ADVANCE_ROLE_DISCOVERY" })
    }

    return (
      <div className="mx-auto max-w-md px-4 py-6">
        <div className="mb-6 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#7b68ee]">
            Night 1
          </div>
          <div className="mt-1 text-xl font-bold">
            {stepInfo.emoji} {stepInfo.label}
          </div>
          <div className="mt-1 text-sm text-gray-400">{stepInfo.instruction}</div>
          <div className="mt-0.5 text-sm text-[#f39c12]">
            Tap the player{stepInfo.multiSelect ? "s" : ""} who {stepInfo.multiSelect ? "are" : "is"} the {stepInfo.label}
          </div>
        </div>

        <PlayerGrid
          players={state.players}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          multiSelect={stepInfo.multiSelect}
          disabledIds={assignedIds}
        />

        <div className="mt-4 flex justify-center gap-2">
          {ROLE_DISCOVERY_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-2.5 w-2.5 rounded-full ${
                i < step ? "bg-[#7b68ee] opacity-50" : i === step ? "bg-[#7b68ee]" : "bg-gray-700"
              }`}
            />
          ))}
          <div
            className={`h-2.5 w-2.5 rounded-full ${step === 5 ? "bg-[#7b68ee]" : "bg-gray-700"}`}
          />
        </div>

        <div className="mt-4 px-3">
          <button
            type="button"
            disabled={selectedIds.length === 0}
            onClick={handleConfirm}
            className={`w-full rounded-xl py-3.5 text-center text-sm font-bold ${
              selectedIds.length > 0
                ? "bg-[#7b68ee] text-white active:bg-[#6a5acd]"
                : "bg-gray-800 text-gray-500"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    )
  }

  // Step 5: Seer check
  const seer = state.players.find((p) => p.role === "seer")
  const assignedIds = state.players.filter((p) => p.role !== null).map((p) => p.id)

  function handleSeerSelect(id: string) {
    if (seerRevealed) return
    setSeerTarget(id)
  }

  function handleReveal() {
    if (!seerTarget) return
    dispatch({ type: "SET_SEER_CHECK", playerId: seerTarget })
    setSeerRevealed(true)
  }

  function handleFinish() {
    dispatch({ type: "ADVANCE_ROLE_DISCOVERY" })
  }

  const checkedPlayer = seerTarget ? state.players.find((p) => p.id === seerTarget) : null
  const seerResult = checkedPlayer
    ? isWolf(checkedPlayer.role) && checkedPlayer.role !== "queen_wolf"
      ? "wolf"
      : "not_wolf"
    : null

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <div className="mb-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#7b68ee]">
          Night 1
        </div>
        <div className="mt-1 text-xl font-bold">👁️ Seer Check</div>
        <div className="mt-1 text-sm text-gray-400">
          &quot;Seer, who do you want to check?&quot;
        </div>
        {seer && (
          <div className="mt-0.5 text-xs text-gray-500">
            Seer: {seer.name}
          </div>
        )}
      </div>

      <PlayerGrid
        players={state.players}
        selectedIds={seerTarget ? [seerTarget] : []}
        onSelect={handleSeerSelect}
        disabledIds={seer ? [seer.id] : []}
      />

      {seerRevealed && seerResult && (
        <div
          className={`mx-3 mt-4 rounded-xl p-4 text-center ${
            seerResult === "wolf"
              ? "bg-[#e94560]/15"
              : "bg-[#2ecc71]/15"
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
            {checkedPlayer?.name} appears to be a {seerResult === "wolf" ? "wolf" : "villager"}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-center gap-2">
        {ROLE_DISCOVERY_STEPS.map((_, i) => (
          <div key={i} className="h-2.5 w-2.5 rounded-full bg-[#7b68ee] opacity-50" />
        ))}
        <div className="h-2.5 w-2.5 rounded-full bg-[#7b68ee]" />
      </div>

      <div className="mt-4 px-3">
        {!seerRevealed ? (
          <button
            type="button"
            disabled={!seerTarget}
            onClick={handleReveal}
            className={`w-full rounded-xl py-3.5 text-center text-sm font-bold ${
              seerTarget
                ? "bg-[#7b68ee] text-white active:bg-[#6a5acd]"
                : "bg-gray-800 text-gray-500"
            }`}
          >
            Reveal Result
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinish}
            className="w-full rounded-xl bg-[#f39c12] py-3.5 text-center text-sm font-bold text-black active:bg-[#e08e0b]"
          >
            End Night 1 → Day 1
          </button>
        )}
      </div>
    </div>
  )
}
