import { useState, useEffect, useCallback } from "react"
import type { GameState, GameAction } from "./types"
import { ROLE_EMOJI, isWolf } from "./types"
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
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full z-20 mt-1 min-w-[180px] rounded-lg border border-gray-700 bg-[#1a1a2e] py-1 shadow-lg">
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false)
                          openRolesGuide()
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-300 active:bg-[#2a2a3e]"
                      >
                        Roles Guide
                      </button>
                      {state.players.some((p) => p.role !== null) && (
                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false)
                            setShowPlayerRoles(true)
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-gray-300 active:bg-[#2a2a3e]"
                        >
                          View Player Roles
                        </button>
                      )}
                      <div className="my-1 border-t border-gray-700" />
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false)
                          dispatch({ type: "RESTART_SAME_PLAYERS" })
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-300 active:bg-[#2a2a3e]"
                      >
                        Restart with same players
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false)
                          dispatch({ type: "NEW_GAME" })
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-300 active:bg-[#2a2a3e]"
                      >
                        New game
                      </button>
                      <div className="my-1 border-t border-gray-700" />
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(state, null, 2))
                          setCopied(true)
                          setTimeout(() => setCopied(false), 1500)
                          setMenuOpen(false)
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-500 active:bg-[#2a2a3e]"
                      >
                        {copied ? "Copied!" : "Copy debug state"}
                      </button>
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      {renderScreen()}
      {showRolesGuide && (
        <RolesGuideScreen onClose={closeRolesGuide} />
      )}
    </>
  )
}
