import { useState } from "react"
import type { GameState, GameAction, GameConfig } from "./types"

type Props = {
  state: GameState
  dispatch: (action: GameAction) => void
}

type OptionalRole = {
  key: keyof Pick<GameConfig, "hasQueenWolf" | "hasBabyWolf" | "hasCourtesan" | "hasWizard" | "hasSeer">
  label: string
  emoji: string
}

const OPTIONAL_ROLES: OptionalRole[] = [
  { key: "hasQueenWolf", label: "Queen Wolf", emoji: "👑🐺" },
  { key: "hasBabyWolf", label: "Baby Wolf", emoji: "🐺👶" },
  { key: "hasCourtesan", label: "Courtesan", emoji: "🌹" },
  { key: "hasWizard", label: "Wizard", emoji: "🧙" },
  { key: "hasSeer", label: "Seer", emoji: "👁️" },
]

export function RoleConfigScreen({ state, dispatch }: Props) {
  const [config, setConfig] = useState<GameConfig>(() => state.gameConfig)

  const playerCount = state.players.length
  const specialRoleCount =
    (config.hasBabyWolf ? 1 : 0) +
    (config.hasCourtesan ? 1 : 0) +
    (config.hasWizard ? 1 : 0) +
    (config.hasSeer ? 1 : 0)

  const maxWolves = Math.min(
    Math.floor((playerCount - 1) / 2),
    playerCount - specialRoleCount,
  )
  const minWolves = 1

  const totalAssigned = config.wolfCount + specialRoleCount
  const villagerCount = playerCount - totalAssigned
  const isValid = config.wolfCount >= minWolves && config.wolfCount <= maxWolves && villagerCount >= 0

  const regularWolfCount = config.wolfCount - (config.hasQueenWolf ? 1 : 0)

  function handleWolfChange(delta: number) {
    setConfig((prev) => {
      const next = prev.wolfCount + delta
      if (next < minWolves || next > maxWolves) return prev
      return { ...prev, wolfCount: next }
    })
  }

  function toggleRole(key: OptionalRole["key"]) {
    setConfig((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      // If disabling queen wolf and wolfCount would become 0 regular wolves, that's fine
      // But if enabling queen wolf and wolfCount < 1, bump it
      if (key === "hasQueenWolf" && next.hasQueenWolf && next.wolfCount < 1) {
        next.wolfCount = 1
      }
      // Recalculate maxWolves with new special role count
      const newSpecialCount =
        (next.hasBabyWolf ? 1 : 0) +
        (next.hasCourtesan ? 1 : 0) +
        (next.hasWizard ? 1 : 0) +
        (next.hasSeer ? 1 : 0)
      const newMax = Math.min(
        Math.floor((playerCount - 1) / 2),
        playerCount - newSpecialCount,
      )
      if (next.wolfCount > newMax) {
        next.wolfCount = Math.max(minWolves, newMax)
      }
      return next
    })
  }

  function handleConfirm() {
    if (!isValid) return
    dispatch({ type: "SET_GAME_CONFIG", config })
  }

  // Build summary text
  function getSummary(): string {
    const parts: string[] = []
    if (config.hasQueenWolf && regularWolfCount > 0) {
      parts.push(`${config.wolfCount} wolves (1 Queen + ${regularWolfCount} regular)`)
    } else if (config.hasQueenWolf) {
      parts.push("1 Queen Wolf")
    } else {
      parts.push(`${config.wolfCount} ${config.wolfCount > 1 ? "wolves" : "wolf"}`)
    }
    if (config.hasBabyWolf) parts.push("Baby Wolf")
    if (config.hasCourtesan) parts.push("Courtesan")
    if (config.hasWizard) parts.push("Wizard")
    if (config.hasSeer) parts.push("Seer")
    if (villagerCount > 0) parts.push(`${villagerCount} villager${villagerCount > 1 ? "s" : ""}`)
    return parts.join(", ")
  }

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <div className="mb-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#7b68ee]">
          Game Setup
        </div>
        <div className="mt-1 text-xl font-bold">Configure Roles</div>
        <div className="mt-1 text-sm text-gray-400">
          {playerCount} players
        </div>
      </div>

      {/* Wolf count */}
      <div className="mx-3 mb-4 rounded-lg bg-[#1a1a2e] p-4">
        <div className="mb-3 text-center text-sm font-semibold text-[#e94560]">
          🐺 Number of Wolves
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => handleWolfChange(-1)}
            disabled={config.wolfCount <= minWolves}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold ${
              config.wolfCount <= minWolves
                ? "bg-gray-800 text-gray-600"
                : "bg-[#2a2a3e] text-white active:bg-[#3a3a4e]"
            }`}
          >
            -
          </button>
          <div className="min-w-[3rem] text-center text-2xl font-bold text-white">
            {config.wolfCount}
          </div>
          <button
            type="button"
            onClick={() => handleWolfChange(1)}
            disabled={config.wolfCount >= maxWolves}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold ${
              config.wolfCount >= maxWolves
                ? "bg-gray-800 text-gray-600"
                : "bg-[#2a2a3e] text-white active:bg-[#3a3a4e]"
            }`}
          >
            +
          </button>
        </div>
        {config.hasQueenWolf && (
          <div className="mt-2 text-center text-[11px] text-gray-500">
            includes Queen Wolf
          </div>
        )}
      </div>

      {/* Optional roles */}
      <div className="mx-3 mb-4 rounded-lg bg-[#1a1a2e] p-4">
        <div className="mb-3 text-center text-sm font-semibold text-[#7b68ee]">
          Optional Roles
        </div>
        <div className="grid grid-cols-2 gap-2">
          {OPTIONAL_ROLES.map((role) => {
            const enabled = config[role.key]
            return (
              <button
                key={role.key}
                type="button"
                onClick={() => toggleRole(role.key)}
                className={`rounded-lg px-3 py-3 text-center text-sm font-semibold transition-colors ${
                  enabled
                    ? "border border-[#7b68ee] bg-[#7b68ee]/15 text-white"
                    : "border border-gray-700 bg-[#2a2a3e] text-gray-500"
                }`}
              >
                <div className="text-lg">{role.emoji}</div>
                <div className="mt-0.5 text-xs">{role.label}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="mx-3 mb-4 rounded-lg bg-[#0f0f1a] border border-gray-800 p-3 text-center text-xs text-gray-400">
        {getSummary()}
      </div>

      {!isValid && (
        <div className="mx-3 mb-3 text-center text-xs text-[#e94560]">
          Not enough players for this configuration
        </div>
      )}

      <div className="px-3">
        <button
          type="button"
          disabled={!isValid}
          onClick={handleConfirm}
          className={`w-full rounded-xl py-3.5 text-center text-sm font-bold ${
            isValid
              ? "bg-[#7b68ee] text-white active:bg-[#6a5acd]"
              : "bg-gray-800 text-gray-500"
          }`}
        >
          Start Night 1
        </button>
      </div>
    </div>
  )
}
