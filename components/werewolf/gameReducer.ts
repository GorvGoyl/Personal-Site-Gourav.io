import type { GameState, GameAction, GamePhase, GameConfig, NightEvent } from "./types"
import { isWolf, getActiveRoleSteps, DEFAULT_GAME_CONFIG } from "./types"
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
    gameConfig: DEFAULT_GAME_CONFIG,
    timerMinutes: 3,
    babyWolfPlayerId: null,
    babyWolfTransformNight: null,
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

// Build ordered list of night phases based on game config
function getNightPhaseOrder(config: GameConfig): Array<GamePhase["type"]> {
  const phases: Array<GamePhase["type"]> = []
  if (config.hasCourtesan) phases.push("night_courtesan")
  phases.push("night_wolves")
  if (config.hasWizard) phases.push("night_wizard")
  if (config.hasSeer) phases.push("night_seer")
  return phases
}

function getFirstNightPhase(config: GameConfig): GamePhase {
  const order = getNightPhaseOrder(config)
  return { type: order[0] } as GamePhase
}

function getPhaseAfter(currentType: string, config: GameConfig): GamePhase {
  const order = getNightPhaseOrder(config)
  const idx = order.indexOf(currentType as GamePhase["type"])
  if (idx >= 0 && idx < order.length - 1) {
    return { type: order[idx + 1] } as GamePhase
  }
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

    case "START_ROLE_CONFIG": {
      return { ...state, currentPhase: { type: "role_config" } }
    }

    case "SET_GAME_CONFIG": {
      return {
        ...state,
        gameConfig: action.config,
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
        babyWolfPlayerId: action.role === "baby_wolf" ? action.playerId : state.babyWolfPlayerId,
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
      const activeSteps = getActiveRoleSteps(state.gameConfig)
      const hasSeerCheck = state.gameConfig.hasSeer
      const totalSteps = activeSteps.length + (hasSeerCheck ? 1 : 0)

      if (nextStep >= totalSteps) {
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
      const updated = {
        ...state,
        currentNightEvent: {
          ...state.currentNightEvent,
          courtesanGuest: action.playerId,
        },
      }
      const nextPhase = getPhaseAfter("night_courtesan", state.gameConfig)
      if (nextPhase.type === "night_results") {
        return gameReducer(updated, { type: "RESOLVE_NIGHT" })
      }
      return { ...updated, currentPhase: nextPhase }
    }

    case "SET_WOLF_TARGET": {
      const updated = {
        ...state,
        currentNightEvent: {
          ...state.currentNightEvent,
          wolfTarget: action.playerId,
        },
      }
      const nextPhase = getPhaseAfter("night_wolves", state.gameConfig)
      if (nextPhase.type === "night_results") {
        return gameReducer(updated, { type: "RESOLVE_NIGHT" })
      }
      return { ...updated, currentPhase: nextPhase }
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
      const nextPhase = getPhaseAfter(phase.type, state.gameConfig)
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

      // Detect baby wolf targeted by wolves (survived due to baby wolf immunity)
      const wolfTarget = state.currentNightEvent.wolfTarget
      const wolfTargetPlayer = wolfTarget ? state.players.find((p) => p.id === wolfTarget) : null
      const babyWolfTargeted = wolfTargetPlayer?.role === "baby_wolf"
        && !deaths.some((d) => d.playerId === wolfTarget)

      const newState = {
        ...state,
        players: updatedPlayers,
        nightEvents: [...state.nightEvents, nightEvent],
        lastCourtesanGuest: state.currentNightEvent.courtesanGuest ?? null,
        currentNightEvent: {},
        babyWolfTransformNight: babyWolfTargeted
          ? state.currentNight + 1
          : state.babyWolfTransformNight,
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
      // Transform baby wolf if this is the transformation night
      const transformBabyWolf = state.babyWolfTransformNight === nextNight
      const players = transformBabyWolf
        ? state.players.map((p) =>
            p.id === state.babyWolfPlayerId ? { ...p, role: "wolf" as const } : p,
          )
        : state.players
      const newState = {
        ...state,
        players,
        currentNight: nextNight,
        currentNightEvent: { night: nextNight },
      }
      return { ...newState, currentPhase: getFirstNightPhase(state.gameConfig) }
    }

    case "NEW_GAME": {
      playerCounter = 0
      return createInitialState()
    }

    case "RESTART_SAME_PLAYERS": {
      return {
        ...createInitialState(),
        players: state.players.map((p) => ({ ...p, role: null, isAlive: true })),
        gameConfig: state.gameConfig,
        timerMinutes: state.timerMinutes,
        babyWolfPlayerId: null,
        babyWolfTransformNight: null,
      }
    }

    case "SET_TIMER_MINUTES": {
      return { ...state, timerMinutes: action.minutes }
    }

    case "RESTORE_STATE": {
      return action.state
    }

    default:
      return state
  }
}
