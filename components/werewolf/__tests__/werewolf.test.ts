import { describe, it, expect } from "vitest"
import { gameReducer, createInitialState } from "../gameReducer"
import { resolveDeaths } from "../deathResolution"
import { isWolf, getActiveRoleSteps, getRegularWolfCount, DEFAULT_GAME_CONFIG } from "../types"
import type { GameState, GameAction, GameConfig, Player } from "../types"

// Helper to create a game state with players added
function setupGame(playerNames: string[]): GameState {
  let state = createInitialState()
  for (const name of playerNames) {
    state = gameReducer(state, { type: "ADD_PLAYER", name })
  }
  return state
}

// Helper to start night 1 with a given config
function startNight1(state: GameState, config?: Partial<GameConfig>): GameState {
  const fullConfig = { ...DEFAULT_GAME_CONFIG, ...config }
  return gameReducer(state, { type: "SET_GAME_CONFIG", config: fullConfig })
}

// Helper: build a fully set up game with roles assigned, ready for Day 1
// Default config: 2 wolves (1 queen_wolf + 1 wolf), courtesan, wizard, seer
function buildGameWithRoles(config?: Partial<GameConfig>): GameState {
  const names = ["ali", "G", "chris", "ha", "josie", "julia", "liana", "maud"]
  let state = setupGame(names)
  const ids = state.players.map((p) => p.id)

  const fullConfig: GameConfig = {
    wolfCount: 2,
    hasQueenWolf: true,
    hasCourtesan: true,
    hasWizard: true,
    hasSeer: true,
    ...config,
  }

  state = startNight1(state, fullConfig)

  // Assign roles based on config
  const activeSteps = getActiveRoleSteps(fullConfig)
  let assignIdx = 0

  for (const step of activeSteps) {
    if (step.role === "courtesan") {
      state = gameReducer(state, { type: "ASSIGN_ROLE", playerId: ids[1], role: "courtesan" })   // G
    } else if (step.role === "queen_wolf") {
      state = gameReducer(state, { type: "ASSIGN_ROLE", playerId: ids[4], role: "queen_wolf" })  // josie
    } else if (step.role === "wolf") {
      const regularCount = getRegularWolfCount(fullConfig)
      // Assign wolves from index 7 backward
      const wolfIds = [ids[7]].slice(0, regularCount) // maud
      state = gameReducer(state, { type: "ASSIGN_WOLVES", playerIds: wolfIds })
    } else if (step.role === "wizard") {
      state = gameReducer(state, { type: "ASSIGN_ROLE", playerId: ids[3], role: "wizard" })      // ha
    } else if (step.role === "seer") {
      state = gameReducer(state, { type: "ASSIGN_ROLE", playerId: ids[2], role: "seer" })        // chris
    }
    state = gameReducer(state, { type: "ADVANCE_ROLE_DISCOVERY" })
  }

  // Seer check during Night 1 discovery (if seer enabled)
  if (fullConfig.hasSeer) {
    state = gameReducer(state, { type: "SET_SEER_CHECK", playerId: ids[0] }) // check ali
    state = gameReducer(state, { type: "ADVANCE_ROLE_DISCOVERY" })
  }

  // Now at day_vote, Day 1
  return state
}

// ===========================
// 1. SETUP & PLAYER MANAGEMENT
// ===========================
describe("Setup & Player Management", () => {
  it("creates initial state correctly", () => {
    const state = createInitialState()
    expect(state.players).toHaveLength(0)
    expect(state.currentPhase).toEqual({ type: "setup" })
    expect(state.currentNight).toBe(0)
    expect(state.wizardSavePotionUsed).toBe(false)
    expect(state.wizardKillPotionUsed).toBe(false)
    expect(state.gameConfig).toEqual(DEFAULT_GAME_CONFIG)
  })

  it("adds players", () => {
    let state = createInitialState()
    state = gameReducer(state, { type: "ADD_PLAYER", name: "Alice" })
    state = gameReducer(state, { type: "ADD_PLAYER", name: "Bob" })
    expect(state.players).toHaveLength(2)
    expect(state.players[0].name).toBe("Alice")
    expect(state.players[1].name).toBe("Bob")
    expect(state.players[0].role).toBeNull()
    expect(state.players[0].isAlive).toBe(true)
  })

  it("trims player names", () => {
    let state = createInitialState()
    state = gameReducer(state, { type: "ADD_PLAYER", name: "  Alice  " })
    expect(state.players[0].name).toBe("Alice")
  })

  it("removes players", () => {
    let state = setupGame(["Alice", "Bob", "Charlie"])
    const bobId = state.players[1].id
    state = gameReducer(state, { type: "REMOVE_PLAYER", id: bobId })
    expect(state.players).toHaveLength(2)
    expect(state.players.map((p) => p.name)).toEqual(["Alice", "Charlie"])
  })

  it("generates unique player IDs", () => {
    const state = setupGame(["A", "B", "C"])
    const ids = state.players.map((p) => p.id)
    expect(new Set(ids).size).toBe(3)
  })
})

// ===========================
// 2. ROLE CONFIG
// ===========================
describe("Role Config", () => {
  it("START_ROLE_CONFIG transitions to role_config phase", () => {
    let state = setupGame(["A", "B", "C", "D", "E"])
    state = gameReducer(state, { type: "START_ROLE_CONFIG" })
    expect(state.currentPhase).toEqual({ type: "role_config" })
  })

  it("SET_GAME_CONFIG stores config and starts night 1", () => {
    let state = setupGame(["A", "B", "C", "D", "E"])
    const config: GameConfig = {
      wolfCount: 1,
      hasQueenWolf: false,
      hasCourtesan: false,
      hasWizard: true,
      hasSeer: true,
    }
    state = gameReducer(state, { type: "SET_GAME_CONFIG", config })
    expect(state.gameConfig).toEqual(config)
    expect(state.currentPhase).toEqual({ type: "night_role_discovery", step: 0 })
    expect(state.currentNight).toBe(1)
  })

  it("getActiveRoleSteps filters based on config", () => {
    const allEnabled: GameConfig = {
      wolfCount: 2,
      hasQueenWolf: true,
      hasCourtesan: true,
      hasWizard: true,
      hasSeer: true,
    }
    expect(getActiveRoleSteps(allEnabled).map((s) => s.role)).toEqual([
      "courtesan", "queen_wolf", "wolf", "wizard", "seer",
    ])

    const minimal: GameConfig = {
      wolfCount: 2,
      hasQueenWolf: false,
      hasCourtesan: false,
      hasWizard: false,
      hasSeer: false,
    }
    expect(getActiveRoleSteps(minimal).map((s) => s.role)).toEqual(["wolf"])

    // Queen wolf only, wolfCount=1 → no regular wolves step
    const queenOnly: GameConfig = {
      wolfCount: 1,
      hasQueenWolf: true,
      hasCourtesan: false,
      hasWizard: false,
      hasSeer: false,
    }
    expect(getActiveRoleSteps(queenOnly).map((s) => s.role)).toEqual(["queen_wolf"])
  })

  it("getRegularWolfCount subtracts queen wolf", () => {
    expect(getRegularWolfCount({ ...DEFAULT_GAME_CONFIG, wolfCount: 3, hasQueenWolf: true })).toBe(2)
    expect(getRegularWolfCount({ ...DEFAULT_GAME_CONFIG, wolfCount: 3, hasQueenWolf: false })).toBe(3)
    expect(getRegularWolfCount({ ...DEFAULT_GAME_CONFIG, wolfCount: 1, hasQueenWolf: true })).toBe(0)
  })
})

// ===========================
// 3. NIGHT 1 ROLE DISCOVERY
// ===========================
describe("Night 1 Role Discovery", () => {
  it("starts night 1 via SET_GAME_CONFIG", () => {
    let state = setupGame(["A", "B", "C", "D", "E"])
    state = startNight1(state)
    expect(state.currentPhase).toEqual({ type: "night_role_discovery", step: 0 })
    expect(state.currentNight).toBe(1)
  })

  it("assigns individual roles", () => {
    let state = setupGame(["A", "B", "C", "D", "E"])
    state = startNight1(state)
    const id = state.players[0].id
    state = gameReducer(state, { type: "ASSIGN_ROLE", playerId: id, role: "courtesan" })
    expect(state.players[0].role).toBe("courtesan")
  })

  it("assigns multiple wolves", () => {
    let state = setupGame(["A", "B", "C", "D", "E"])
    state = startNight1(state)
    const wolfIds = [state.players[2].id, state.players[3].id]
    state = gameReducer(state, { type: "ASSIGN_WOLVES", playerIds: wolfIds })
    expect(state.players[2].role).toBe("wolf")
    expect(state.players[3].role).toBe("wolf")
    expect(state.players[0].role).toBeNull()
  })

  it("auto-assigns villagers after all steps complete", () => {
    const state = buildGameWithRoles()
    const villagers = state.players.filter((p) => p.role === "villager")
    expect(villagers.length).toBeGreaterThan(0)
    expect(state.players.every((p) => p.role !== null)).toBe(true)
  })

  it("transitions to day_vote after role discovery", () => {
    const state = buildGameWithRoles()
    expect(state.currentPhase).toEqual({ type: "day_vote" })
    expect(state.currentDay).toBe(1)
  })

  it("records Night 1 event with seer check", () => {
    const state = buildGameWithRoles()
    expect(state.nightEvents).toHaveLength(1)
    expect(state.nightEvents[0].night).toBe(1)
    expect(state.nightEvents[0].seerChecked).toBeTruthy()
    expect(state.nightEvents[0].deaths).toHaveLength(0)
  })

  it("works with minimal config (wolves only)", () => {
    let state = setupGame(["A", "B", "C", "D", "E"])
    state = startNight1(state, {
      wolfCount: 2,
      hasQueenWolf: false,
      hasCourtesan: false,
      hasWizard: false,
      hasSeer: false,
    })
    // Only wolves step, then done
    const ids = state.players.map((p) => p.id)
    state = gameReducer(state, { type: "ASSIGN_WOLVES", playerIds: [ids[0], ids[1]] })
    state = gameReducer(state, { type: "ADVANCE_ROLE_DISCOVERY" })
    // Should go straight to day (no seer check)
    expect(state.currentPhase).toEqual({ type: "day_vote" })
    expect(state.players.filter((p) => p.role === "wolf")).toHaveLength(2)
    expect(state.players.filter((p) => p.role === "villager")).toHaveLength(3)
  })

  it("works with queen wolf only (no regular wolves)", () => {
    let state = setupGame(["A", "B", "C", "D", "E"])
    state = startNight1(state, {
      wolfCount: 1,
      hasQueenWolf: true,
      hasCourtesan: false,
      hasWizard: false,
      hasSeer: false,
    })
    // Only queen_wolf step
    const ids = state.players.map((p) => p.id)
    state = gameReducer(state, { type: "ASSIGN_ROLE", playerId: ids[0], role: "queen_wolf" })
    state = gameReducer(state, { type: "ADVANCE_ROLE_DISCOVERY" })
    expect(state.currentPhase).toEqual({ type: "day_vote" })
    expect(state.players.filter((p) => p.role === "queen_wolf")).toHaveLength(1)
    expect(state.players.filter((p) => p.role === "villager")).toHaveLength(4)
  })
})

// ===========================
// 4. SEER CHECK LOGIC
// ===========================
describe("Seer Check", () => {
  it("detects regular wolf", () => {
    let state = setupGame(["A", "B"])
    state = startNight1(state)
    state = gameReducer(state, { type: "ASSIGN_WOLVES", playerIds: [state.players[1].id] })
    state = gameReducer(state, { type: "SET_SEER_CHECK", playerId: state.players[1].id })
    expect(state.currentNightEvent.seerResult).toBe("wolf")
  })

  it("queen wolf shows as NOT wolf to seer", () => {
    let state = setupGame(["A", "B"])
    state = startNight1(state)
    state = gameReducer(state, { type: "ASSIGN_ROLE", playerId: state.players[1].id, role: "queen_wolf" })
    state = gameReducer(state, { type: "SET_SEER_CHECK", playerId: state.players[1].id })
    expect(state.currentNightEvent.seerResult).toBe("not_wolf")
  })

  it("villager shows as not wolf", () => {
    let state = setupGame(["A", "B"])
    state = startNight1(state)
    state = gameReducer(state, { type: "ASSIGN_ROLE", playerId: state.players[0].id, role: "villager" })
    state = gameReducer(state, { type: "SET_SEER_CHECK", playerId: state.players[0].id })
    expect(state.currentNightEvent.seerResult).toBe("not_wolf")
  })
})

// ===========================
// 5. DEATH RESOLUTION (pure function)
// ===========================
describe("Death Resolution", () => {
  function makePlayers(): Player[] {
    return [
      { id: "courtesan", name: "G", role: "courtesan", isAlive: true },
      { id: "wolf1", name: "josie", role: "queen_wolf", isAlive: true },
      { id: "wolf2", name: "maud", role: "wolf", isAlive: true },
      { id: "wizard", name: "ha", role: "wizard", isAlive: true },
      { id: "seer", name: "chris", role: "seer", isAlive: true },
      { id: "v1", name: "ali", role: "villager", isAlive: true },
      { id: "v2", name: "julia", role: "villager", isAlive: true },
    ]
  }

  it("normal wolf attack kills target", () => {
    const deaths = resolveDeaths(makePlayers(), { wolfTarget: "v1" }, null)
    expect(deaths).toHaveLength(1)
    expect(deaths[0]).toEqual({ playerId: "v1", cause: "Attacked by wolves" })
  })

  it("wolf attacks courtesan's guest — no death from wolf attack", () => {
    const deaths = resolveDeaths(
      makePlayers(),
      { courtesanGuest: "v1", wolfTarget: "v1" },
      null,
    )
    expect(deaths).toHaveLength(0)
  })

  it("wolf attacks courtesan — both courtesan and guest die", () => {
    const deaths = resolveDeaths(
      makePlayers(),
      { courtesanGuest: "v1", wolfTarget: "courtesan" },
      null,
    )
    expect(deaths).toHaveLength(2)
    const ids = deaths.map((d) => d.playerId)
    expect(ids).toContain("courtesan")
    expect(ids).toContain("v1")
  })

  it("wolf attacks courtesan — wolf guest does NOT die", () => {
    const deaths = resolveDeaths(
      makePlayers(),
      { courtesanGuest: "wolf1", wolfTarget: "courtesan" },
      null,
    )
    const ids = deaths.map((d) => d.playerId)
    expect(ids).toContain("courtesan")
    expect(ids).not.toContain("wolf1")
  })

  it("courtesan invites a wolf — courtesan dies", () => {
    const deaths = resolveDeaths(
      makePlayers(),
      { courtesanGuest: "wolf1", wolfTarget: "v1" },
      null,
    )
    const ids = deaths.map((d) => d.playerId)
    expect(ids).toContain("courtesan")
    expect(ids).toContain("v1")
    expect(deaths).toHaveLength(2)
  })

  it("courtesan invites a wolf AND wolves attack courtesan — courtesan dies once", () => {
    const deaths = resolveDeaths(
      makePlayers(),
      { courtesanGuest: "wolf2", wolfTarget: "courtesan" },
      null,
    )
    const courtesanDeaths = deaths.filter((d) => d.playerId === "courtesan")
    expect(courtesanDeaths).toHaveLength(1)
    expect(deaths.find((d) => d.playerId === "wolf2")).toBeUndefined()
  })

  it("wizard save removes a death", () => {
    const deaths = resolveDeaths(makePlayers(), { wolfTarget: "v1" }, "v1")
    expect(deaths).toHaveLength(0)
  })

  it("wizard saves courtesan from wolf invite death", () => {
    const deaths = resolveDeaths(
      makePlayers(),
      { courtesanGuest: "wolf1", wolfTarget: "v1" },
      "courtesan",
    )
    const ids = deaths.map((d) => d.playerId)
    expect(ids).not.toContain("courtesan")
    expect(ids).toContain("v1")
  })

  it("wizard kill potion adds a death", () => {
    const deaths = resolveDeaths(
      makePlayers(),
      { wolfTarget: "v1", wizardKilled: "wolf1" },
      null,
    )
    expect(deaths).toHaveLength(2)
    expect(deaths.find((d) => d.playerId === "wolf1")!.cause).toBe("Killed by the Wizard")
  })

  it("wizard save + kill in same night", () => {
    const deaths = resolveDeaths(
      makePlayers(),
      { wolfTarget: "v1", wizardKilled: "wolf2" },
      "v1",
    )
    expect(deaths).toHaveLength(1)
    expect(deaths[0].playerId).toBe("wolf2")
  })

  it("no wolf target — no wolf deaths", () => {
    const deaths = resolveDeaths(makePlayers(), {}, null)
    expect(deaths).toHaveLength(0)
  })

  it("wizard kills someone who also died from wolves — only one death entry", () => {
    const deaths = resolveDeaths(
      makePlayers(),
      { wolfTarget: "v1", wizardKilled: "v1" },
      null,
    )
    const v1Deaths = deaths.filter((d) => d.playerId === "v1")
    expect(v1Deaths).toHaveLength(1)
  })

  it("dead courtesan does not trigger guest scenarios", () => {
    const players = makePlayers().map((p) =>
      p.id === "courtesan" ? { ...p, isAlive: false } : p,
    )
    const deaths = resolveDeaths(
      players,
      { courtesanGuest: "wolf1", wolfTarget: "v1" },
      null,
    )
    expect(deaths).toHaveLength(1)
    expect(deaths[0].playerId).toBe("v1")
  })
})

// ===========================
// 6. NIGHT PHASE FLOW
// ===========================
describe("Night Phase Flow", () => {
  it("full config: courtesan → wolves → wizard → seer → results", () => {
    let state = buildGameWithRoles()
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })
    expect(state.currentPhase).toEqual({ type: "night_courtesan" })
    expect(state.currentNight).toBe(2)

    state = gameReducer(state, { type: "SET_COURTESAN_GUEST", playerId: state.players[5].id })
    expect(state.currentPhase).toEqual({ type: "night_wolves" })

    state = gameReducer(state, { type: "SET_WOLF_TARGET", playerId: state.players[0].id })
    expect(state.currentPhase).toEqual({ type: "night_wizard" })

    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" })
    expect(state.currentPhase).toEqual({ type: "night_seer" })

    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" })
    expect(state.currentPhase).toEqual({ type: "night_results" })
  })

  it("no courtesan: wolves → wizard → seer → results", () => {
    let state = buildGameWithRoles({ hasCourtesan: false })
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })
    expect(state.currentPhase).toEqual({ type: "night_wolves" })

    state = gameReducer(state, { type: "SET_WOLF_TARGET", playerId: state.players[0].id })
    expect(state.currentPhase).toEqual({ type: "night_wizard" })

    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" })
    expect(state.currentPhase).toEqual({ type: "night_seer" })

    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" })
    expect(state.currentPhase).toEqual({ type: "night_results" })
  })

  it("no wizard, no seer: courtesan → wolves → results", () => {
    let state = buildGameWithRoles({ hasWizard: false, hasSeer: false })
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })
    expect(state.currentPhase).toEqual({ type: "night_courtesan" })

    state = gameReducer(state, { type: "SET_COURTESAN_GUEST", playerId: state.players[0].id })
    expect(state.currentPhase).toEqual({ type: "night_wolves" })

    state = gameReducer(state, { type: "SET_WOLF_TARGET", playerId: state.players[5].id })
    // After wolves, no wizard/seer → straight to resolve
    expect(state.currentPhase.type).toBe("night_results")
  })

  it("wolves only: wolves → results", () => {
    let state = buildGameWithRoles({
      hasCourtesan: false,
      hasWizard: false,
      hasSeer: false,
      hasQueenWolf: false,
    })
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })
    expect(state.currentPhase).toEqual({ type: "night_wolves" })

    state = gameReducer(state, { type: "SET_WOLF_TARGET", playerId: state.players[0].id })
    expect(state.currentPhase.type).toBe("night_results")
  })

  it("SKIP_TO_NEXT_PHASE works for dead characters", () => {
    let state = buildGameWithRoles()
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })

    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // skip courtesan
    expect(state.currentPhase).toEqual({ type: "night_wolves" })

    state = gameReducer(state, { type: "SET_WOLF_TARGET", playerId: state.players[0].id })
    expect(state.currentPhase).toEqual({ type: "night_wizard" })

    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // skip wizard
    expect(state.currentPhase).toEqual({ type: "night_seer" })

    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // skip seer → results
    expect(state.currentPhase).toEqual({ type: "night_results" })
  })

  it("RESOLVE_NIGHT records deaths and updates players", () => {
    let state = buildGameWithRoles()
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })

    const targetId = state.players[0].id
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // skip courtesan
    state = gameReducer(state, { type: "SET_WOLF_TARGET", playerId: targetId })
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // skip wizard
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // skip seer → resolves night

    const ali = state.players.find((p) => p.id === targetId)!
    expect(ali.isAlive).toBe(false)

    expect(state.nightEvents).toHaveLength(2)
    const lastNight = state.nightEvents[state.nightEvents.length - 1]
    expect(lastNight.wolfTarget).toBe(targetId)
    expect(lastNight.deaths).toHaveLength(1)
  })
})

// ===========================
// 7. DAY VOTE & ELIMINATION
// ===========================
describe("Day Vote & Elimination", () => {
  it("eliminates a player and reveals role", () => {
    let state = buildGameWithRoles()
    const wolfId = state.players.find((p) => p.role === "queen_wolf")!.id
    state = gameReducer(state, { type: "ELIMINATE_PLAYER", playerId: wolfId })
    expect(state.players.find((p) => p.id === wolfId)!.isAlive).toBe(false)
    expect(state.dayEvents[0].revealedRole).toBe("queen_wolf")
  })

  it("multiple eliminations in same day share the day number", () => {
    let state = buildGameWithRoles()
    state = gameReducer(state, { type: "ELIMINATE_PLAYER", playerId: state.players[0].id })
    state = gameReducer(state, { type: "ELIMINATE_PLAYER", playerId: state.players[5].id })
    expect(state.dayEvents).toHaveLength(2)
    expect(state.dayEvents[0].day).toBe(1)
    expect(state.dayEvents[1].day).toBe(1)
  })

  it("START_DAY transitions to day_vote", () => {
    let state = buildGameWithRoles()
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // courtesan
    state = gameReducer(state, { type: "SET_WOLF_TARGET", playerId: state.players[0].id })
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // wizard
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // seer → results
    state = gameReducer(state, { type: "START_DAY" })
    expect(state.currentPhase).toEqual({ type: "day_vote" })
  })
})

// ===========================
// 8. WIN CONDITIONS
// ===========================
describe("Win Conditions", () => {
  it("village wins when all wolves are eliminated", () => {
    let state = buildGameWithRoles()
    const wolves = state.players.filter((p) => isWolf(p.role))
    for (const wolf of wolves) {
      state = gameReducer(state, { type: "ELIMINATE_PLAYER", playerId: wolf.id })
    }
    expect(state.currentPhase).toEqual({ type: "game_over", winner: "village" })
  })

  it("wolves win when wolves >= non-wolves", () => {
    let state = buildGameWithRoles()
    const nonWolves = state.players.filter((p) => !isWolf(p.role))
    for (let i = 0; i < 4; i++) {
      state = gameReducer(state, { type: "ELIMINATE_PLAYER", playerId: nonWolves[i].id })
      if (state.currentPhase.type === "game_over") break
    }
    expect(state.currentPhase).toEqual({ type: "game_over", winner: "wolves" })
  })

  it("wolves win via night kills", () => {
    let state = setupGame(["A", "B", "C", "D", "E"])
    const ids = state.players.map((p) => p.id)
    state = startNight1(state, {
      wolfCount: 2,
      hasQueenWolf: true,
      hasCourtesan: true,
      hasWizard: false,
      hasSeer: false,
    })
    // Assign: A=courtesan, B=queen_wolf, C=wolf
    state = gameReducer(state, { type: "ASSIGN_ROLE", playerId: ids[0], role: "courtesan" })
    state = gameReducer(state, { type: "ADVANCE_ROLE_DISCOVERY" })
    state = gameReducer(state, { type: "ASSIGN_ROLE", playerId: ids[1], role: "queen_wolf" })
    state = gameReducer(state, { type: "ADVANCE_ROLE_DISCOVERY" })
    state = gameReducer(state, { type: "ASSIGN_WOLVES", playerIds: [ids[2]] })
    state = gameReducer(state, { type: "ADVANCE_ROLE_DISCOVERY" })
    // No seer → straight to day. 2 wolves, 3 non-wolves

    // Night 2: wolves attack courtesan
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // courtesan
    state = gameReducer(state, { type: "SET_WOLF_TARGET", playerId: ids[0] })
    // After wolves → results (no wizard/seer). 2 wolves, 2 non-wolves → wolves win
    expect(state.currentPhase).toEqual({ type: "game_over", winner: "wolves" })
  })
})

// ===========================
// 9. WIZARD POTION TRACKING
// ===========================
describe("Wizard Potion Tracking", () => {
  it("save potion marks as used", () => {
    let state = buildGameWithRoles()
    state = gameReducer(state, { type: "SET_WIZARD_SAVE", playerId: state.players[0].id })
    expect(state.wizardSavePotionUsed).toBe(true)
  })

  it("save potion stays unused when null", () => {
    let state = buildGameWithRoles()
    state = gameReducer(state, { type: "SET_WIZARD_SAVE", playerId: null })
    expect(state.wizardSavePotionUsed).toBe(false)
  })

  it("kill potion marks as used", () => {
    let state = buildGameWithRoles()
    state = gameReducer(state, { type: "SET_WIZARD_KILL", playerId: state.players[0].id })
    expect(state.wizardKillPotionUsed).toBe(true)
  })

  it("kill potion stays unused when null", () => {
    let state = buildGameWithRoles()
    state = gameReducer(state, { type: "SET_WIZARD_KILL", playerId: null })
    expect(state.wizardKillPotionUsed).toBe(false)
  })
})

// ===========================
// 10. COURTESAN GUEST TRACKING
// ===========================
describe("Courtesan Guest Tracking", () => {
  it("tracks last courtesan guest after night resolves", () => {
    let state = buildGameWithRoles()
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })
    const guestId = state.players[0].id
    state = gameReducer(state, { type: "SET_COURTESAN_GUEST", playerId: guestId })
    state = gameReducer(state, { type: "SET_WOLF_TARGET", playerId: state.players[5].id })
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // wizard
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // seer → resolve
    expect(state.lastCourtesanGuest).toBe(guestId)
  })

  it("resets lastCourtesanGuest to null when courtesan skips", () => {
    let state = buildGameWithRoles()
    // Night 2: courtesan picks ali
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })
    state = gameReducer(state, { type: "SET_COURTESAN_GUEST", playerId: state.players[0].id })
    state = gameReducer(state, { type: "SET_WOLF_TARGET", playerId: state.players[5].id })
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // wizard
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // seer → resolve
    expect(state.lastCourtesanGuest).toBe(state.players[0].id)

    // Night 3: courtesan skips
    state = gameReducer(state, { type: "START_DAY" })
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // courtesan skipped
    state = gameReducer(state, { type: "SET_WOLF_TARGET", playerId: state.players[2].id })
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // wizard
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // seer → resolve
    expect(state.lastCourtesanGuest).toBeNull()
  })
})

// ===========================
// 11. GAME RESET
// ===========================
describe("Game Reset", () => {
  it("NEW_GAME resets everything", () => {
    let state = buildGameWithRoles()
    state = gameReducer(state, { type: "NEW_GAME" })
    expect(state.players).toHaveLength(0)
    expect(state.currentPhase).toEqual({ type: "setup" })
    expect(state.currentNight).toBe(0)
    expect(state.nightEvents).toHaveLength(0)
  })

  it("RESTART_SAME_PLAYERS keeps names and config", () => {
    const customConfig: GameConfig = {
      wolfCount: 3,
      hasQueenWolf: false,
      hasCourtesan: true,
      hasWizard: false,
      hasSeer: true,
    }
    let state = buildGameWithRoles(customConfig)
    const originalNames = state.players.map((p) => p.name)

    state = gameReducer(state, { type: "RESTART_SAME_PLAYERS" })
    expect(state.players.map((p) => p.name)).toEqual(originalNames)
    expect(state.players.every((p) => p.role === null)).toBe(true)
    expect(state.players.every((p) => p.isAlive === true)).toBe(true)
    expect(state.currentPhase).toEqual({ type: "setup" })
    expect(state.gameConfig).toEqual(customConfig)
  })
})

// ===========================
// 12. CONFIG-DRIVEN NIGHT FLOW
// ===========================
describe("Config-Driven Night Flow", () => {
  it("game without courtesan skips courtesan phase entirely", () => {
    let state = buildGameWithRoles({ hasCourtesan: false })
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })
    // Should start directly at wolves
    expect(state.currentPhase).toEqual({ type: "night_wolves" })
  })

  it("game without wizard skips wizard phase", () => {
    let state = buildGameWithRoles({ hasWizard: false })
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // courtesan
    state = gameReducer(state, { type: "SET_WOLF_TARGET", playerId: state.players[0].id })
    // After wolves → seer (skipping wizard)
    expect(state.currentPhase).toEqual({ type: "night_seer" })
  })

  it("game without seer skips seer phase", () => {
    let state = buildGameWithRoles({ hasSeer: false })
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // courtesan
    state = gameReducer(state, { type: "SET_WOLF_TARGET", playerId: state.players[0].id })
    // After wolves → wizard
    expect(state.currentPhase).toEqual({ type: "night_wizard" })
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // wizard → results (no seer)
    expect(state.currentPhase).toEqual({ type: "night_results" })
  })

  it("minimal game: wolves only night phase", () => {
    let state = buildGameWithRoles({
      hasCourtesan: false,
      hasWizard: false,
      hasSeer: false,
      hasQueenWolf: false,
    })
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })
    expect(state.currentPhase).toEqual({ type: "night_wolves" })
    state = gameReducer(state, { type: "SET_WOLF_TARGET", playerId: state.players[0].id })
    // Directly to results
    expect(state.currentPhase.type).toBe("night_results")
  })

  it("no wizard means no potion tracking needed", () => {
    let state = buildGameWithRoles({ hasWizard: false })
    expect(state.wizardSavePotionUsed).toBe(false)
    expect(state.wizardKillPotionUsed).toBe(false)
    // These stay false throughout the game since wizard actions never dispatch
  })

  it("no courtesan means no courtesan death scenarios", () => {
    let state = buildGameWithRoles({ hasCourtesan: false })
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })
    // Wolves attack a villager
    const villager = state.players.find((p) => p.role === "villager" && p.isAlive)!
    state = gameReducer(state, { type: "SET_WOLF_TARGET", playerId: villager.id })
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // wizard
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // seer → resolve

    const lastNight = state.nightEvents[state.nightEvents.length - 1]
    expect(lastNight.courtesanGuest).toBeNull()
    expect(lastNight.deaths).toHaveLength(1)
    expect(lastNight.deaths[0].playerId).toBe(villager.id)
  })
})

// ===========================
// 13. FULL GAME FLOW
// ===========================
describe("Full Game Flow", () => {
  it("plays a complete game with all roles", () => {
    let state = setupGame(["A", "B", "C", "D", "E", "F"])
    const ids = state.players.map((p) => p.id)

    state = startNight1(state, {
      wolfCount: 1,
      hasQueenWolf: true,
      hasCourtesan: true,
      hasWizard: true,
      hasSeer: true,
    })
    // queen_wolf=1, regular wolves=0 → steps: courtesan, queen_wolf, wizard, seer
    state = gameReducer(state, { type: "ASSIGN_ROLE", playerId: ids[0], role: "courtesan" })
    state = gameReducer(state, { type: "ADVANCE_ROLE_DISCOVERY" })
    state = gameReducer(state, { type: "ASSIGN_ROLE", playerId: ids[1], role: "queen_wolf" })
    state = gameReducer(state, { type: "ADVANCE_ROLE_DISCOVERY" })
    // No wolves step (regularWolfCount=0)
    state = gameReducer(state, { type: "ASSIGN_ROLE", playerId: ids[2], role: "wizard" })
    state = gameReducer(state, { type: "ADVANCE_ROLE_DISCOVERY" })
    state = gameReducer(state, { type: "ASSIGN_ROLE", playerId: ids[3], role: "seer" })
    state = gameReducer(state, { type: "ADVANCE_ROLE_DISCOVERY" })
    // Seer check
    state = gameReducer(state, { type: "SET_SEER_CHECK", playerId: ids[1] })
    state = gameReducer(state, { type: "ADVANCE_ROLE_DISCOVERY" })

    expect(state.currentPhase).toEqual({ type: "day_vote" })

    // Day 1: eliminate queen wolf
    state = gameReducer(state, { type: "ELIMINATE_PLAYER", playerId: ids[1] })
    expect(state.currentPhase).toEqual({ type: "game_over", winner: "village" })
  })

  it("plays a minimal game (wolves only)", () => {
    let state = setupGame(["A", "B", "C", "D", "E"])
    const ids = state.players.map((p) => p.id)

    state = startNight1(state, {
      wolfCount: 2,
      hasQueenWolf: false,
      hasCourtesan: false,
      hasWizard: false,
      hasSeer: false,
    })
    state = gameReducer(state, { type: "ASSIGN_WOLVES", playerIds: [ids[0], ids[1]] })
    state = gameReducer(state, { type: "ADVANCE_ROLE_DISCOVERY" })
    // Straight to day (no seer check)

    // Day 1: eliminate both wolves
    state = gameReducer(state, { type: "ELIMINATE_PLAYER", playerId: ids[0] })
    state = gameReducer(state, { type: "ELIMINATE_PLAYER", playerId: ids[1] })
    expect(state.currentPhase).toEqual({ type: "game_over", winner: "village" })
  })
})

// ===========================
// 14. EDGE CASES
// ===========================
describe("Edge Cases", () => {
  it("RESTORE_STATE replaces entire state", () => {
    const state = buildGameWithRoles()
    const fresh = createInitialState()
    const restored = gameReducer(state, { type: "RESTORE_STATE", state: fresh })
    expect(restored).toEqual(fresh)
  })

  it("isWolf helper correctly identifies wolves", () => {
    expect(isWolf("wolf")).toBe(true)
    expect(isWolf("queen_wolf")).toBe(true)
    expect(isWolf("villager")).toBe(false)
    expect(isWolf("courtesan")).toBe(false)
    expect(isWolf("wizard")).toBe(false)
    expect(isWolf("seer")).toBe(false)
    expect(isWolf(null)).toBe(false)
  })

  it("wizard saves courtesan who was attacked AND invited a wolf", () => {
    const players: Player[] = [
      { id: "courtesan", name: "G", role: "courtesan", isAlive: true },
      { id: "wolf1", name: "josie", role: "queen_wolf", isAlive: true },
      { id: "v1", name: "ali", role: "villager", isAlive: true },
    ]
    const deaths = resolveDeaths(
      players,
      { courtesanGuest: "wolf1", wolfTarget: "courtesan" },
      "courtesan",
    )
    expect(deaths.filter((d) => d.playerId === "courtesan")).toHaveLength(0)
  })

  it("wolf attacks courtesan with no guest — normal attack", () => {
    const players: Player[] = [
      { id: "courtesan", name: "G", role: "courtesan", isAlive: true },
      { id: "wolf1", name: "josie", role: "wolf", isAlive: true },
      { id: "v1", name: "ali", role: "villager", isAlive: true },
    ]
    const deaths = resolveDeaths(players, { wolfTarget: "courtesan" }, null)
    expect(deaths).toHaveLength(1)
    expect(deaths[0].playerId).toBe("courtesan")
    expect(deaths[0].cause).toBe("Attacked by wolves")
  })

  it("currentNightEvent resets after night resolution", () => {
    let state = buildGameWithRoles()
    state = gameReducer(state, { type: "START_NEXT_NIGHT" })
    state = gameReducer(state, { type: "SET_COURTESAN_GUEST", playerId: state.players[0].id })
    state = gameReducer(state, { type: "SET_WOLF_TARGET", playerId: state.players[5].id })
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // wizard
    state = gameReducer(state, { type: "SKIP_TO_NEXT_PHASE" }) // seer → resolve
    expect(state.currentNightEvent.wolfTarget).toBeUndefined()
    expect(state.currentNightEvent.courtesanGuest).toBeUndefined()
  })

  it("wizard save potion stays used after null dispatch", () => {
    let state = buildGameWithRoles()
    state = gameReducer(state, { type: "SET_WIZARD_SAVE", playerId: state.players[0].id })
    expect(state.wizardSavePotionUsed).toBe(true)
    state = gameReducer(state, { type: "SET_WIZARD_SAVE", playerId: null })
    expect(state.wizardSavePotionUsed).toBe(true)
  })
})
