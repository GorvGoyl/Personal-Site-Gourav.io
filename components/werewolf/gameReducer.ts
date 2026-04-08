import type { GameState, GameAction, GamePhase, NightEvent } from "./types"
import { isWolf } from "./types"
import { resolveDeaths } from "./deathResolution"

let playerCounter = 0

export function createInitialState(): GameState {
  return {
    players: [],
    currentPhase: { type: "setup" },
    currentNight: 0,
    currentDay: 0,
    nightEvents: [],
    dayEvents: [],
    wizardSavePotionUsed: false,
    wizardKillPotionUsed: false,
    lastCourtesanGuest: null,
    currentNightEvent: {},
  }
}

function checkWinCondition(state: GameState): GamePhase | null {
  const alivePlayers = state.players.filter((p) => p.isAlive)
  const aliveWolves = alivePlayers.filter((p) => isWolf(p.role))
  const aliveNonWolves = alivePlayers.filter((p) => !isWolf(p.role))

  if (aliveWolves.length === 0) {
    return { type: "game_over", winner: "village" }
  }
  if (aliveWolves.length >= aliveNonWolves.length) {
    return { type: "game_over", winner: "wolves" }
  }
  return null
}

function getNextNightPhase(): GamePhase {
  return { type: "night_courtesan" }
}

function getPhaseAfterCourtesan(): GamePhase {
  return { type: "night_wolves" }
}

function getPhaseAfterWolves(): GamePhase {
  return { type: "night_wizard" }
}

function getPhaseAfterWizard(): GamePhase {
  return { type: "night_seer" }
}

function getPhaseAfterSeer(): GamePhase {
  return { type: "night_results" }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "ADD_PLAYER": {
      playerCounter++
      const newPlayer = {
        id: `player-${playerCounter}-${Date.now()}`,
        name: action.name.trim(),
        role: null,
        isAlive: true,
      }
      return { ...state, players: [...state.players, newPlayer] }
    }

    case "REMOVE_PLAYER": {
      return { ...state, players: state.players.filter((p) => p.id !== action.id) }
    }

    case "START_NIGHT_1": {
      return {
        ...state,
        currentPhase: { type: "night_role_discovery", step: 0 },
        currentNight: 1,
        currentNightEvent: { night: 1 },
      }
    }

    case "ASSIGN_ROLE": {
      return {
        ...state,
        players: state.players.map((p) =>
          p.id === action.playerId ? { ...p, role: action.role } : p,
        ),
      }
    }

    case "ASSIGN_WOLVES": {
      return {
        ...state,
        players: state.players.map((p) =>
          action.playerIds.includes(p.id) ? { ...p, role: "wolf" } : p,
        ),
      }
    }

    case "ADVANCE_ROLE_DISCOVERY": {
      const phase = state.currentPhase as { type: "night_role_discovery"; step: number }
      const nextStep = phase.step + 1

      // After step 4 (Seer assigned), move to Seer check (step 5)
      // After step 5 (Seer check done), auto-assign villagers and go to day
      if (nextStep > 5) {
        const updatedPlayers = state.players.map((p) =>
          p.role === null ? { ...p, role: "villager" as const } : p,
        )
        const nightEvent: NightEvent = {
          night: 1,
          courtesanGuest: null,
          wolfTarget: null,
          wizardSaved: null,
          wizardKilled: null,
          seerChecked: state.currentNightEvent.seerChecked ?? null,
          seerResult: state.currentNightEvent.seerResult ?? null,
          deaths: [],
        }
        return {
          ...state,
          players: updatedPlayers,
          currentPhase: { type: "day_vote" },
          currentDay: 1,
          nightEvents: [...state.nightEvents, nightEvent],
          currentNightEvent: {},
        }
      }

      return {
        ...state,
        currentPhase: { type: "night_role_discovery", step: nextStep },
      }
    }

    case "SET_SEER_CHECK": {
      const target = state.players.find((p) => p.id === action.playerId)
      const result = target && isWolf(target.role) && target.role !== "queen_wolf"
        ? ("wolf" as const)
        : ("not_wolf" as const)
      return {
        ...state,
        currentNightEvent: {
          ...state.currentNightEvent,
          seerChecked: action.playerId,
          seerResult: result,
        },
      }
    }

    case "SET_COURTESAN_GUEST": {
      return {
        ...state,
        currentNightEvent: {
          ...state.currentNightEvent,
          courtesanGuest: action.playerId,
        },
        currentPhase: getPhaseAfterCourtesan(),
      }
    }

    case "SET_WOLF_TARGET": {
      const updated = {
        ...state,
        currentNightEvent: {
          ...state.currentNightEvent,
          wolfTarget: action.playerId,
        },
      }
      return {
        ...updated,
        currentPhase: getPhaseAfterWolves(),
      }
    }

    case "SET_WIZARD_SAVE": {
      return {
        ...state,
        currentNightEvent: {
          ...state.currentNightEvent,
          wizardSaved: action.playerId,
        },
        wizardSavePotionUsed: action.playerId !== null ? true : state.wizardSavePotionUsed,
      }
    }

    case "SET_WIZARD_KILL": {
      return {
        ...state,
        currentNightEvent: {
          ...state.currentNightEvent,
          wizardKilled: action.playerId,
        },
        wizardKillPotionUsed: action.playerId !== null ? true : state.wizardKillPotionUsed,
      }
    }

    case "SKIP_TO_NEXT_PHASE": {
      const phase = state.currentPhase
      let nextPhase: GamePhase = state.currentPhase
      if (phase.type === "night_courtesan") {
        nextPhase = getPhaseAfterCourtesan()
      } else if (phase.type === "night_wolves") {
        nextPhase = getPhaseAfterWolves()
      } else if (phase.type === "night_wizard") {
        nextPhase = getPhaseAfterWizard()
      } else if (phase.type === "night_seer") {
        nextPhase = getPhaseAfterSeer()
      }
      // If next phase is night_results, resolve the night first
      if (nextPhase.type === "night_results") {
        return gameReducer(state, { type: "RESOLVE_NIGHT" })
      }
      return { ...state, currentPhase: nextPhase }
    }

    case "RESOLVE_NIGHT": {
      const deaths = resolveDeaths(
        state.players,
        state.currentNightEvent,
        state.currentNightEvent.wizardSaved ?? null,
      )

      const updatedPlayers = state.players.map((p) => {
        if (deaths.some((d) => d.playerId === p.id)) {
          return { ...p, isAlive: false }
        }
        return p
      })

      const nightEvent: NightEvent = {
        night: state.currentNight,
        courtesanGuest: state.currentNightEvent.courtesanGuest ?? null,
        wolfTarget: state.currentNightEvent.wolfTarget ?? null,
        wizardSaved: state.currentNightEvent.wizardSaved ?? null,
        wizardKilled: state.currentNightEvent.wizardKilled ?? null,
        seerChecked: state.currentNightEvent.seerChecked ?? null,
        seerResult: state.currentNightEvent.seerResult ?? null,
        deaths,
      }

      const newState = {
        ...state,
        players: updatedPlayers,
        nightEvents: [...state.nightEvents, nightEvent],
        lastCourtesanGuest: state.currentNightEvent.courtesanGuest ?? null,
        currentNightEvent: {},
      }

      const winPhase = checkWinCondition(newState)
      if (winPhase) {
        return { ...newState, currentPhase: winPhase }
      }

      return { ...newState, currentPhase: { type: "night_results" } }
    }

    case "START_DAY": {
      return {
        ...state,
        currentPhase: { type: "day_vote" },
        currentDay: state.currentNight,
      }
    }

    case "ELIMINATE_PLAYER": {
      const player = state.players.find((p) => p.id === action.playerId)
      const updatedPlayers = state.players.map((p) =>
        p.id === action.playerId ? { ...p, isAlive: false } : p,
      )

      const dayEvent = {
        day: state.currentDay,
        eliminated: action.playerId,
        revealedRole: player?.role ?? null,
      }

      const newState = {
        ...state,
        players: updatedPlayers,
        dayEvents: [...state.dayEvents, dayEvent],
      }

      const winPhase = checkWinCondition(newState)
      if (winPhase) {
        return { ...newState, currentPhase: winPhase }
      }

      return { ...newState, currentPhase: { type: "day_vote" } }
    }

    case "START_NEXT_NIGHT": {
      const nextNight = state.currentNight + 1
      const newState = {
        ...state,
        currentNight: nextNight,
        currentNightEvent: { night: nextNight },
      }
      return { ...newState, currentPhase: getNextNightPhase() }
    }

    case "NEW_GAME": {
      playerCounter = 0
      return createInitialState()
    }

    case "RESTART_SAME_PLAYERS": {
      return {
        ...createInitialState(),
        players: state.players.map((p) => ({ ...p, role: null, isAlive: true })),
      }
    }

    case "RESTORE_STATE": {
      return action.state
    }

    default:
      return state
  }
}
