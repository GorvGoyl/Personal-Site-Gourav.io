import { useState, useEffect, useCallback } from "react"
import type { GameState, GameAction } from "./types"
import { ROLE_EMOJI, isWolf, getRoleDisplayName } from "./types"
import { SetupScreen } from "./SetupScreen"
import { RoleConfigScreen } from "./RoleConfigScreen"
import { RoleDiscoveryScreen } from "./RoleDiscoveryScreen"
import { CourtesanScreen } from "./CourtesanScreen"
import { WolfAttackScreen } from "./WolfAttackScreen"
import { WizardScreen } from "./WizardScreen"
import { SeerScreen } from "./SeerScreen"
import { NightResultsScreen } from "./NightResultsScreen"
import { DayVoteScreen } from "./DayVoteScreen"
import { GameOverScreen } from "./GameOverScreen"
import { RolesGuideScreen } from "./RolesGuideScreen"
import { RoleNamesScreen } from "./RoleNamesScreen"

type Props = {
  state: GameState
  dispatch: (action: GameAction) => void
  onBack: () => void
  canGoBack: boolean
}

export function WerewolfApp({ state, dispatch, onBack, canGoBack }: Props) {
  const phase = state.currentPhase
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showRolesGuide, setShowRolesGuide] = useState(false)
  const [showPlayerRoles, setShowPlayerRoles] = useState(false)
  const [showRoleNames, setShowRoleNames] = useState(false)

  const openRolesGuide = useCallback(() => {
    setShowRolesGuide(true)
    window.history.replaceState(null, "", "#rules")
  }, [])

  const closeRolesGuide = useCallback(() => {
    setShowRolesGuide(false)
    window.history.replaceState(null, "", window.location.pathname)
  }, [])

  useEffect(() => {
    if (window.location.hash === "#rules") {
      setShowRolesGuide(true)
    }
    function onHashChange() {
      setShowRolesGuide(window.location.hash === "#rules")
    }
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  function renderScreen() {
    switch (phase.type) {
      case "setup":
        return <SetupScreen state={state} dispatch={dispatch} />
      case "role_config":
        return <RoleConfigScreen state={state} dispatch={dispatch} />
      case "night_role_discovery":
        return <RoleDiscoveryScreen state={state} dispatch={dispatch} step={phase.step} />
      case "night_courtesan":
        return <CourtesanScreen state={state} dispatch={dispatch} />
      case "night_wolves":
        return <WolfAttackScreen state={state} dispatch={dispatch} />
      case "night_wizard":
        return <WizardScreen state={state} dispatch={dispatch} />
      case "night_seer":
        return <SeerScreen state={state} dispatch={dispatch} />
      case "night_results":
        return <NightResultsScreen state={state} dispatch={dispatch} />
      case "day_vote":
        return <DayVoteScreen state={state} dispatch={dispatch} />
      case "game_over":
        return <GameOverScreen state={state} dispatch={dispatch} winner={phase.winner} />
      default:
        return null
    }
  }

  return (
    <>
      <div className="sticky top-0 z-10 bg-[#0f0f1a]/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-md items-center justify-between px-4 py-2">
            {canGoBack ? (
              <button
                type="button"
                onClick={onBack}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-400 active:text-white"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}
            <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="rounded-lg px-2 py-1.5 text-gray-400 active:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="3" y1="4" x2="15" y2="4" />
                    <line x1="3" y1="9" x2="15" y2="9" />
                    <line x1="3" y1="14" x2="15" y2="14" />
                  </svg>
                </button>
                {menuOpen && (
                    <div className="absolute right-0 top-full z-30 mt-1 min-w-[200px] rounded-xl border border-gray-700 bg-[#1a1a2e] py-2 shadow-xl">
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false)
                          openRolesGuide()
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-300 active:bg-[#2a2a3e]"
                      >
                        <span className="w-5 text-center text-base">📖</span>
                        Roles Guide
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false)
                          setShowRoleNames(true)
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-300 active:bg-[#2a2a3e]"
                      >
                        <span className="w-5 text-center text-base">✏️</span>
                        Role Names
                      </button>
                      {state.players.some((p) => p.role !== null) && (
                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false)
                            setShowPlayerRoles(true)
                          }}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-300 active:bg-[#2a2a3e]"
                        >
                          <span className="w-5 text-center text-base">👥</span>
                          Player Roles
                        </button>
                      )}
                      <div className="my-1.5 border-t border-gray-700/50" />
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false)
                          dispatch({ type: "RESTART_SAME_PLAYERS" })
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-300 active:bg-[#2a2a3e]"
                      >
                        <span className="w-5 text-center text-base">🔄</span>
                        Restart Game
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false)
                          dispatch({ type: "NEW_GAME" })
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-300 active:bg-[#2a2a3e]"
                      >
                        <span className="w-5 text-center text-base">✨</span>
                        New Game
                      </button>
                      <div className="my-1.5 border-t border-gray-700/50" />
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(state, null, 2))
                          setCopied(true)
                          setTimeout(() => setCopied(false), 1500)
                          setMenuOpen(false)
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-500 active:bg-[#2a2a3e]"
                      >
                        <span className="w-5 text-center text-base">📋</span>
                        {copied ? "Copied!" : "Debug State"}
                      </button>
                    </div>
                )}
            </div>
          </div>
        </div>
      {menuOpen && (
        <div className="fixed inset-0 z-[5]" onClick={() => setMenuOpen(false)} />
      )}
      {renderScreen()}
      {showRolesGuide && (
        <RolesGuideScreen onClose={closeRolesGuide} />
      )}
      {showRoleNames && (
        <RoleNamesScreen state={state} dispatch={dispatch} onClose={() => setShowRoleNames(false)} />
      )}
      {showPlayerRoles && (
        <div className="fixed inset-0 z-30 overflow-y-auto bg-[#0f0f1a]">
          <div className="mx-auto max-w-md px-4 py-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="text-xl font-bold">Player Roles</div>
              <button
                type="button"
                onClick={() => setShowPlayerRoles(false)}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-400 active:text-white"
              >
                Close
              </button>
            </div>
            <div className="space-y-1.5">
              {[...state.players]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((p) => {
                  const wolf = isWolf(p.role)
                  const isBabyWolf = p.id === state.babyWolfPlayerId
                  const emoji = isBabyWolf ? ROLE_EMOJI.baby_wolf : ROLE_EMOJI[p.role ?? "villager"]
                  const rn = state.roleNames
                  const roleName = isBabyWolf
                    ? (p.role === "wolf"
                      ? `${getRoleDisplayName("baby_wolf", rn)} → ${getRoleDisplayName("wolf", rn)}`
                      : getRoleDisplayName("baby_wolf", rn))
                    : getRoleDisplayName(p.role, rn)
                  const isWolfTeam = wolf || (isBabyWolf && p.role === "wolf")
                  const isBabyWolfUntransformed = isBabyWolf && p.role === "baby_wolf"
                  const isVillageSupporter = !isWolfTeam && !isBabyWolfUntransformed
                    && p.role !== null && p.role !== "villager"
                  const borderColor = isWolfTeam
                    ? "border-[#e94560]/40"
                    : isBabyWolfUntransformed
                      ? "border-[#7b68ee]/40"
                      : isVillageSupporter
                        ? "border-[#2ecc71]/40"
                        : "border-gray-700/40"
                  const roleColor = isWolfTeam
                    ? "text-[#e94560]"
                    : isBabyWolfUntransformed
                      ? "text-[#7b68ee]"
                      : isVillageSupporter
                        ? "text-[#2ecc71]"
                        : "text-gray-400"
                  return (
                    <div
                      key={p.id}
                      className={`flex items-center justify-between rounded-lg border bg-[#1a1a2e] px-4 py-3 ${borderColor} ${
                        !p.isAlive ? "opacity-40" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-lg">{emoji}</div>
                        <div>
                          <div className={`text-sm font-semibold ${!p.isAlive ? "text-gray-500 line-through" : "text-white"}`}>
                            {p.name}
                          </div>
                          <div className={`text-xs ${roleColor}`}>
                            {roleName}
                          </div>
                        </div>
                      </div>
                      {!p.isAlive && <div className="text-sm text-gray-600">💀</div>}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
