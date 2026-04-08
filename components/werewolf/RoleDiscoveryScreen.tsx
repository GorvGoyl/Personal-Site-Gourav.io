import { useState } from "react"
import type { GameState, GameAction } from "./types"
import { isWolf, getActiveRoleSteps, getRegularWolfCount, getRoleDisplayName } from "./types"
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

  const activeSteps = getActiveRoleSteps(state.gameConfig)
  const isSeerCheckStep = state.gameConfig.hasSeer && step === activeSteps.length

  // Steps 0 to activeSteps.length-1: role assignment
  if (!isSeerCheckStep) {
    const stepInfo = activeSteps[step]
    const assignedIds = state.players.filter((p) => p.role !== null).map((p) => p.id)
    const expectedWolfCount = getRegularWolfCount(state.gameConfig)

    function handleSelect(id: string) {
      if (stepInfo.multiSelect) {
        setSelectedIds((prev) => {
          if (prev.includes(id)) return prev.filter((x) => x !== id)
          if (prev.length >= expectedWolfCount) return prev
          return [...prev, id]
        })
      } else {
        setSelectedIds([id])
      }
    }

    const canConfirm = stepInfo.multiSelect
      ? selectedIds.length === expectedWolfCount
      : selectedIds.length > 0

    function handleConfirm() {
      if (!canConfirm) return

      if (stepInfo.multiSelect) {
        dispatch({ type: "ASSIGN_WOLVES", playerIds: selectedIds })
      } else {
        dispatch({ type: "ASSIGN_ROLE", playerId: selectedIds[0], role: stepInfo.role })
      }

      setSelectedIds([])
      dispatch({ type: "ADVANCE_ROLE_DISCOVERY" })
    }

    const totalDots = activeSteps.length + (state.gameConfig.hasSeer ? 1 : 0)

    return (
      <div className="mx-auto max-w-md px-4 py-6">
        <div className="mb-6 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#7b68ee]">
            Night 1
          </div>
          <div className="mt-1 text-xl font-bold">
            {stepInfo.emoji} {getRoleDisplayName(stepInfo.role, state.roleNames)}
          </div>
          <div className="mt-1 text-sm text-gray-400">
            &quot;{getRoleDisplayName(stepInfo.role, state.roleNames)}, open your eyes&quot;
          </div>
          <div className="mt-0.5 text-sm text-[#f39c12]">
            {stepInfo.multiSelect
              ? `Select ${expectedWolfCount} player${expectedWolfCount > 1 ? "s" : ""} — the ${getRoleDisplayName(stepInfo.role, state.roleNames)}${expectedWolfCount > 1 ? "s" : ""}`
              : `Tap the player who is the ${getRoleDisplayName(stepInfo.role, state.roleNames)}`}
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
          {Array.from({ length: totalDots }, (_, i) => (
            <div
              key={i}
              className={`h-2.5 w-2.5 rounded-full ${
                i < step ? "bg-[#7b68ee] opacity-50" : i === step ? "bg-[#7b68ee]" : "bg-gray-700"
              }`}
            />
          ))}
        </div>

        <div className="mt-4 px-3">
          <button
            type="button"
            disabled={!canConfirm}
            onClick={handleConfirm}
            className={`w-full rounded-xl py-3.5 text-center text-sm font-bold ${
              canConfirm
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

  // Seer check step
  const seer = state.players.find((p) => p.role === "seer")

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

  const totalDots = activeSteps.length + 1

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <div className="mb-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#7b68ee]">
          Night 1
        </div>
        <div className="mt-1 text-xl font-bold">👁️ {getRoleDisplayName("seer", state.roleNames)} Check</div>
        <div className="mt-1 text-sm text-gray-400">
          &quot;{getRoleDisplayName("seer", state.roleNames)}, who do you want to check?&quot;
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
        {Array.from({ length: totalDots }, (_, i) => (
          <div
            key={i}
            className={`h-2.5 w-2.5 rounded-full ${
              i < step ? "bg-[#7b68ee] opacity-50" : i === step ? "bg-[#7b68ee]" : "bg-gray-700"
            }`}
          />
        ))}
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
